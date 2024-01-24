import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const attempts = await prisma.attempt.findFirst({
    where: {
      userId: body.userId,
      questionnaireId: body.questionnaireId,
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

  const correctAnswersCount = attempts?.selectedAnswers.reduce(
    (total, current) => (current.answer?.isCorrect ? total + 1 : total),
    0,
  );

  return Response.json({
    count: correctAnswersCount,
    max: attempts?.questionnaire?.questions.length,
  });
}
