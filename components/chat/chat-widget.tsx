"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { createChatReply } from "@/lib/chat";

type Message = {
  role: "user" | "assistant";
  text: string;
  recommendationSlug?: string;
  suggestions?: string[];
};

type ChatApiResponse = {
  answer: string;
  suggestions: string[];
  recommendationSlug?: string;
};

const isDestinationSlug = (value?: string) =>
  value === "paris-1889" || value === "cretace" || value === "florence-1504";

const resolveSlugFromPathname = (pathname: string): string | undefined => {
  const segments = pathname.split("/").filter(Boolean);
  const destinationsIndex = segments.indexOf("destinations");
  if (destinationsIndex === -1) return undefined;

  const slug = segments[destinationsIndex + 1];
  if (!slug || !isDestinationSlug(slug)) return undefined;
  return slug;
};

const quickPrompts = [
  "Quelle destination me correspond ?",
  "Quel budget pour Paris 1889 ?",
  "Comment choisir mon époque ?",
  "Quelles sont les règles de sécurité ?",
];

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Bonjour, je suis votre assistant virtuel TimeTravel Agency. Je peux vous conseiller une époque, estimer un budget et vous guider vers la réservation idéale.",
    },
  ]);

  const contextFromPath = useMemo(() => resolveSlugFromPathname(pathname), [pathname]);

  const lastRecommendation = useMemo(
    () => [...messages].reverse().find((message) => message.recommendationSlug)?.recommendationSlug,
    [messages],
  );

  const sendPrompt = async (rawValue: string) => {
    const value = rawValue.trim();
    if (!value) return;

    const nextMessages = [...messages, { role: "user" as const, text: value }];
    setMessages(nextMessages);
    setLoading(true);
    setInput("");

    const contextSlug = (contextFromPath ?? lastRecommendation) as string | undefined;
    const history = nextMessages
      .slice(0, -1)
      .slice(-6)
      .map((message) => ({ role: message.role, text: message.text }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          history,
          contextSlug,
        }),
      });

      if (!response.ok) {
        throw new Error("chat_api_error");
      }

      const payload = (await response.json()) as ChatApiResponse;

      setMessages((state) => [
        ...state,
        {
          role: "assistant",
          text: payload.answer,
          recommendationSlug: payload.recommendationSlug,
          suggestions: payload.suggestions,
        },
      ]);
    } catch {
      const fallback = createChatReply(value, contextSlug);
      setMessages((state) => [
        ...state,
        {
          role: "assistant",
          text: fallback.answer,
          recommendationSlug: fallback.recommendationSlug,
          suggestions: fallback.suggestions,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendPrompt(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        aria-label="Ouvrir l'assistant temporel"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-brand/60 bg-gradient-to-br from-brand-soft via-brand to-[#b86b32] text-[#2a1507] shadow-[0_18px_40px_-18px_rgba(241,143,68,0.85)] transition hover:scale-[1.03] hover:brightness-105"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            fill="currentColor"
            d="M12 3a9 9 0 0 0-9 9c0 2.28.84 4.37 2.22 5.96L4.5 21l3.3-1.42A8.96 8.96 0 0 0 12 21a9 9 0 0 0 0-18Zm-4.5 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4.5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4.5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
          />
        </svg>
      </button>
      {open ? (
        <aside className="fixed bottom-20 right-5 z-50 flex h-[min(76vh,560px)] w-[min(94vw,390px)] flex-col rounded-3xl border border-brand/25 bg-[radial-gradient(circle_at_top,#1f3149_0%,#0b1421_45%,#050b14_100%)] p-4 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.8)] backdrop-blur-lg">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">TimeTravel Agency</p>
              <p className="font-semibold text-white">Concierge temporel IA</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-white/20 px-2 py-1 text-xs text-muted transition hover:text-white"
            >
              Fermer
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-xl px-3 py-2 ${
                  message.role === "assistant"
                    ? "border border-white/8 bg-white/8 text-white"
                    : "ml-8 border border-brand/40 bg-brand/85 text-[#20120a]"
                }`}
              >
                {message.text}
                {message.role === "assistant" && message.suggestions?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.slice(0, 3).map((suggestion) => (
                      <button
                        key={`${index}-${suggestion}`}
                        type="button"
                        onClick={() => void sendPrompt(suggestion)}
                        className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/85 transition hover:border-brand/45 hover:text-brand-soft"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {loading ? (
              <div className="w-fit rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-xs text-muted">
                Analyse chronologique en cours...
              </div>
            ) : null}
          </div>
          {lastRecommendation ? (
            <Link
              href={`/reservation?destination=${lastRecommendation}`}
              className="mt-3 rounded-lg border border-brand/40 bg-brand/15 px-3 py-2 text-xs text-brand-soft transition hover:bg-brand/25"
            >
              Utiliser cette recommandation dans la réservation
            </Link>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => void sendPrompt(prompt)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-muted transition hover:border-brand/40 hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Posez-moi vos questions sur les voyages temporels..."
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand px-3 text-sm font-semibold text-[#20120a] transition hover:bg-[#f2a463] disabled:opacity-60"
            >
              Envoyer
            </button>
          </form>
        </aside>
      ) : null}
    </>
  );
}
