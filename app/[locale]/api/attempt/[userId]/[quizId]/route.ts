import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string; quizId: string } },
) {
  const userId = params.userId;
  const quizId = parseInt(params.quizId);

  let attempt = await prisma.attempt.findFirst({
    where: {
      userId,
      questionnaireId: quizId,
    },
    include: {
      questionnaire: {
        include: {
          questions: true,
        },
      },
      selectedAnswers: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          answer: {
            select: {
              questionId: true,
              isCorrect: true,
            },
          },
        },
      },
    },
  });

  if (!attempt) {
    const newAttempt = await prisma.attempt.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        questionnaire: {
          connect: {
            id: quizId,
          },
        },
        selectedAnswers: {
          create: [],
        },
      },
    });

    const data = {
      id: newAttempt.id,
      lastQuestionIndex: -1,
      count: 0,
      isFinished: false,
    };

    return Response.json(data);
  }

  const lastQuestionIndex = attempt?.selectedAnswers?.length - 1;
  const correctAnswerCount =
    attempt?.selectedAnswers?.filter((val: any) => val.answer?.isCorrect)
      .length || 0;
  const isFinished =
    lastQuestionIndex + 1 === attempt?.questionnaire?.questions?.length;

  const data = {
    attempt,
    id: attempt.id,
    lastQuestionIndex,
    count: correctAnswerCount,
    isFinished,
  };

  return Response.json(data);
}
