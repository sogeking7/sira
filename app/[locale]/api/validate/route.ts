import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";
import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const token = body.token;

  const { payload } = await jwtVerify(token, getJwtSecretKey());

  if (!payload.id) {
    return Response.json({ id: null, phone: null });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return Response.json({ id: null, phone: null });
    }
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }

  const attempts = await prisma.attempt.findFirst({
    where: {
      userId: payload.id,
    },
    orderBy: {
      questionnaire: {
        id: "desc",
      },
    },
  });

  if (!attempts) {
    return Response.json({
      user: {
        id: payload.id,
        phone: payload.phone,
      },
      attempts: null,
    });
  }

  const foo = await prisma.attempt.findFirst({
    where: {
      userId: payload.id,
      questionnaireId: attempts.questionnaireId,
    },
    include: {
      questionnaire: {
        select: {
          questions: true,
        },
      },
      selectedAnswers: {
        select: {
          answer: {
            select: {
              isCorrect: true,
            },
          },
        },
      },
    },
  });

  const correctAnswersCount = foo?.selectedAnswers.reduce(
    (total: number, current: any) =>
      current.answer?.isCorrect ? total + 1 : total,
    0,
  );

  return Response.json({
    user: {
      id: payload.id,
      phone: payload.phone,
    },
    attempts: {
      ...attempts[0],
      count: correctAnswersCount,
      max: foo?.questionnaire?.questions.length,
    },
  });
}
