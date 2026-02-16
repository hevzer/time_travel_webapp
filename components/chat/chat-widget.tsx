"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  text: string;
  recommendationSlug?: string;
  suggestions?: string[];
};

const quickPrompts = [
  "Quelle destination me correspond ?",
  "Quelles sont les règles de sécurité ?",
  "Aide réservation",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Bonjour, je suis votre agent temporel. Je peux recommander une destination et préparer votre réservation.",
    },
  ]);

  const lastRecommendation = useMemo(
    () => [...messages].reverse().find((message) => message.recommendationSlug)?.recommendationSlug,
    [messages],
  );

  const sendPrompt = async (value: string) => {
    if (!value.trim()) return;
    setMessages((state) => [...state, { role: "user", text: value }]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const payload = (await response.json()) as {
        answer: string;
        recommendationSlug?: string;
        suggestions?: string[];
      };

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
      setMessages((state) => [
        ...state,
        {
          role: "assistant",
          text: "Je rencontre une turbulence temporelle. Réessayez dans quelques secondes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPrompt(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="fixed bottom-5 right-5 z-40 rounded-full border border-brand/60 bg-brand px-5 py-3 text-sm font-semibold text-[#1f1207] shadow-lg shadow-black/40 transition hover:bg-[#f7a563]"
      >
        Agent IA
      </button>
      {open ? (
        <aside className="fixed bottom-20 right-5 z-50 flex h-[480px] w-[min(92vw,360px)] flex-col rounded-2xl border border-white/15 bg-[#06101d]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-lg">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-white">Assistant temporel</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-white/20 px-2 py-1 text-xs text-muted"
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
                    ? "bg-white/10 text-white"
                    : "ml-8 bg-brand/80 text-[#20120a]"
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
                        className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/80"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {loading ? (
              <div className="w-fit rounded-xl bg-white/10 px-3 py-2 text-xs text-muted">
                Analyse temporelle en cours...
              </div>
            ) : null}
          </div>
          {lastRecommendation ? (
            <Link
              href={`/reservation?destination=${lastRecommendation}`}
              className="mt-3 rounded-lg border border-ok/35 bg-ok/20 px-3 py-2 text-xs text-ok"
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
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-muted transition hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Posez votre question"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand px-3 text-sm font-semibold text-[#20120a] disabled:opacity-60"
            >
              Envoyer
            </button>
          </form>
        </aside>
      ) : null}
    </>
  );
}
