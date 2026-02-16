"use client";

import {
  getQuizRecommendation,
  quizQuestions,
  type QuizAnswers,
  type QuizRecommendation,
} from "@/lib/quiz-recommendation";
import Link from "next/link";
import { useMemo, useState } from "react";

type PartialQuizAnswers = Partial<QuizAnswers>;

const isCompleteAnswers = (answers: PartialQuizAnswers): answers is QuizAnswers =>
  quizQuestions.every((question) => Boolean(answers[question.id]));

export function RecommendationQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PartialQuizAnswers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizRecommendation | null>(null);

  const currentQuestion = quizQuestions[step];
  const selectedAnswer = answers[currentQuestion.id];
  const progressPercent = ((step + 1) / quizQuestions.length) * 100;

  const scorePreview = useMemo(() => {
    if (!isCompleteAnswers(answers)) return null;
    return getQuizRecommendation(answers).scoreBreakdown;
  }, [answers]);

  const onSelect = (optionId: string) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: optionId,
    }));
    setError(null);
  };

  const onNext = () => {
    if (!selectedAnswer) {
      setError("Sélectionnez une réponse pour continuer.");
      return;
    }
    setError(null);
    setStep((current) => Math.min(current + 1, quizQuestions.length - 1));
  };

  const onPrevious = () => {
    setError(null);
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = async () => {
    if (!isCompleteAnswers(answers)) {
      setError("Le quiz doit contenir 4 réponses.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = getQuizRecommendation(answers);
      setResult(payload);
    } catch (submitError) {
      setResult(null);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Impossible de calculer votre destination idéale.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  return (
    <article className="rounded-3xl border border-white/10 bg-surface p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-soft">
          Recommandation intelligente
        </p>
        <p className="text-xs text-muted">
          Question {step + 1}/{quizQuestions.length}
        </p>
      </div>

      <h3 className="mt-3 font-serif text-3xl text-white">
        Quiz interactif : trouvez votre destination idéale
      </h3>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a1626] p-5">
        <p className="text-lg font-semibold text-white">{currentQuestion.title}</p>
        <div className="mt-4 grid gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "border-brand bg-brand/15 text-white"
                    : "border-white/15 bg-white/5 text-muted hover:border-white/35 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={step === 0}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Retour
        </button>

        {step < quizQuestions.length - 1 ? (
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#1f1207]"
          >
            Continuer
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void onSubmit()}
            disabled={loading}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#1f1207] disabled:opacity-60"
          >
            {loading ? "Analyse en cours..." : "Afficher ma destination"}
          </button>
        )}
      </div>

      {error ? <p className="mt-4 text-sm text-[#ffb6a1]">{error}</p> : null}

      {result ? (
        <div className="mt-6 rounded-2xl border border-ok/30 bg-ok/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-ok">Résultat personnalisé</p>
          <p className="mt-2 text-2xl font-semibold text-white">{result.name}</p>
          <p className="mt-3 text-sm text-muted">{result.explanation}</p>

          <div className="mt-4 grid gap-3 text-xs text-white/80 md:grid-cols-3">
            <div className="rounded-lg border border-white/20 bg-black/20 px-3 py-2">
              Paris 1889 : {result.scoreBreakdown["paris-1889"]} pts
            </div>
            <div className="rounded-lg border border-white/20 bg-black/20 px-3 py-2">
              Crétacé : {result.scoreBreakdown.cretace} pts
            </div>
            <div className="rounded-lg border border-white/20 bg-black/20 px-3 py-2">
              Florence 1504 : {result.scoreBreakdown["florence-1504"]} pts
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/reservation?destination=${result.slug}`}
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#1f1207]"
            >
              Réserver cette destination
            </Link>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white"
            >
              Refaire le quiz
            </button>
          </div>
        </div>
      ) : null}

      {scorePreview && !result ? (
        <p className="mt-4 text-xs text-muted">
          Prévisualisation actuelle : Paris 1889 ({scorePreview["paris-1889"]}), Crétacé (
          {scorePreview.cretace}), Florence 1504 ({scorePreview["florence-1504"]}).
        </p>
      ) : null}
    </article>
  );
}
