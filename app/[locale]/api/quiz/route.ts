import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  let questionnaire;

  let attempt = await prisma.attempt.findFirst({
    where: {
      userId: body.userId,
      questionnaireId: body.questionnaireId,
    },
    select: {
      id: true,
      userId: true,
      questionnaireId: true,
      questionnaire: {
        select: {
          id: true,
          title: true,
          questions: true,
        },
      },
      selectedAnswers: {
        select: {
          answer: {
            select: {
              isCorrect: true,
              question: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!attempt) {
    try {
      questionnaire = await prisma.questionnaire.findFirst({
        where: {
          id: body.questionnaireId,
        },
        select: {
          id: true,
          title: true,
          questions: {
            select: {
              id: true,
              title: true,
              answers: {
                select: {
                  id: true,
                  title: true,
                  isCorrect: false,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      return Response.json({ message: error }, { status: 500 });
    }
  }

  const nextQuestionId = attempt?.selectedAnswers[0]?.answer?.question?.id || 0;

  const nextQuestion = await prisma.question.findFirst({
    where: {
      questionnaireId: body.questionnaireId,
      id: {
        gt: nextQuestionId,
      },
    },
    include: {
      answers: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 1,
  });

  const foo = await prisma.question.findFirst({
    where: {
      questionnaireId: body.questionnaireId,
      id: {
        gt: nextQuestionId + 1,
      },
    },
    include: {
      answers: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 1,
  });

  if (attempt) {
    const correctAnswersCount = attempt?.selectedAnswers.reduce(
      (total: number, current: any) => {
        return current.answer?.isCorrect ? total + 1 : total;
      },
      0,
    );
    return Response.json({
      attempt,
      nextQuestion,
      correctAnswersCount,
      isLastQuestion: foo === null,
    });
  } else {
    return Response.json({
      attempt: {
        questionnaire,
      },
      nextQuestion,
      correctAnswersCount: 0,
      isLastQuestion: foo === null,
    });
  }
}
