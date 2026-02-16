import {
  getQuizRecommendation,
  isQuizAnswers,
  type QuizAnswers,
} from "@/lib/quiz-recommendation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { answers?: QuizAnswers };

    if (!isQuizAnswers(payload.answers)) {
      return NextResponse.json(
        { message: "Réponses du quiz invalides." },
        { status: 400 },
      );
    }

    const recommendation = getQuizRecommendation(payload.answers);
    return NextResponse.json(recommendation);
  } catch {
    return NextResponse.json(
      { message: "Impossible de calculer une recommandation." },
      { status: 400 },
    );
  }
}
