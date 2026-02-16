import { createChatReply } from "@/lib/chat";
import type { TravelerProfile } from "@/lib/types";
import { NextResponse } from "next/server";

type ChatBody = {
  message?: string;
  contextSlug?: string;
  profile?: TravelerProfile;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ answer: "Merci de saisir une question." }, { status: 400 });
    }

    const reply = createChatReply(message, body.contextSlug, body.profile);
    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      { answer: "Erreur interne temporaire. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
