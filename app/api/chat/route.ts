import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { destinationBySlug } from "@/data/destinations";
import { createChatReply } from "@/lib/chat";
import { buildChatSystemPrompt } from "@/lib/chat-system-prompt";
import type { ChatReply } from "@/lib/types";

const MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 8;

const readRuntimeEnv = async (key: string) => {
  const localValue = process.env[key];
  if (typeof localValue === "string" && localValue.trim()) {
    return localValue;
  }

  try {
    const context = await getCloudflareContext({ async: true });
    const runtimeValue = (context.env as Record<string, unknown>)[key];
    if (typeof runtimeValue === "string" && runtimeValue.trim()) {
      return runtimeValue;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

type RequestHistoryMessage = {
  role: "user" | "assistant";
  text: string;
};

type ChatRequestPayload = {
  message?: unknown;
  history?: unknown;
  contextSlug?: unknown;
};

type MistralResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ text?: string }>;
    };
  }>;
};

const normalizeUserText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_MESSAGE_LENGTH);
};

const parseContextSlug = (value: unknown) => {
  if (value === "paris-1889" || value === "cretace" || value === "florence-1504") {
    return value;
  }

  return undefined;
};

const parseHistory = (value: unknown): RequestHistoryMessage[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const role = (item as { role?: unknown }).role;
      const text = normalizeUserText((item as { text?: unknown }).text);

      if ((role !== "user" && role !== "assistant") || !text) {
        return null;
      }

      return { role, text };
    })
    .filter((item): item is RequestHistoryMessage => item !== null)
    .slice(-MAX_HISTORY_MESSAGES);
};

const extractMistralText = (response: MistralResponse) => {
  const content = response.choices?.[0]?.message?.content;
  if (!content) return "";

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((chunk) => (typeof chunk?.text === "string" ? chunk.text : ""))
      .join(" ")
      .trim();
  }

  return "";
};

const toChatReply = (fallback: ChatReply, answer: string): ChatReply => ({
  answer,
  suggestions: fallback.suggestions,
  recommendationSlug: fallback.recommendationSlug,
});

export async function POST(request: Request) {
  let payload: ChatRequestPayload;

  try {
    payload = (await request.json()) as ChatRequestPayload;
  } catch {
    return NextResponse.json(
      { error: "Le format de la requête est invalide." },
      { status: 400 },
    );
  }

  const message = normalizeUserText(payload.message);
  if (!message) {
    return NextResponse.json(
      { error: "Merci de saisir une question avant d'envoyer." },
      { status: 400 },
    );
  }

  const contextSlug = parseContextSlug(payload.contextSlug);
  const history = parseHistory(payload.history);
  const fallbackReply = createChatReply(message, contextSlug);

  const apiKey = await readRuntimeEnv("MISTRAL_API_KEY");
  if (!apiKey) {
    return NextResponse.json(fallbackReply);
  }

  const model = (await readRuntimeEnv("MISTRAL_MODEL")) ?? "mistral-small-latest";
  const contextDestination = contextSlug ? destinationBySlug(contextSlug)?.name : undefined;

  try {
    const response = await fetch(MISTRAL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.45,
        max_tokens: 380,
        messages: [
          {
            role: "system",
            content: buildChatSystemPrompt(),
          },
          ...(contextDestination
            ? [
                {
                  role: "system",
                  content: `Le visiteur consulte actuellement la destination ${contextDestination}.`,
                },
              ]
            : []),
          ...history.map((entry) => ({
            role: entry.role,
            content: entry.text,
          })),
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const mistralError = await response.text();
      console.error("Mistral API error", response.status, mistralError.slice(0, 300));
      return NextResponse.json(fallbackReply);
    }

    const json = (await response.json()) as MistralResponse;
    const aiAnswer = extractMistralText(json);
    if (!aiAnswer) {
      return NextResponse.json(fallbackReply);
    }

    return NextResponse.json(toChatReply(fallbackReply, aiAnswer));
  } catch (error) {
    console.error("Mistral API request failed", error);
    return NextResponse.json(fallbackReply);
  }
}
