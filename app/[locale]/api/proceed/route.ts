import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  let attempt = await prisma.attempt.findFirst({
    where: {
      userId: body.userId,
      questionnaireId: body.questionnaireId,
    },
    select: {
      id: true,
      userId: true,
      questionnaireId: true,
      selectedAnswers: {
        select: {
          id: true,
          answerId: true,
          answer: {
            select: {
              id: true,
              isCorrect: true,
            },
          },
        },
      },
    },
  });

  if (!attempt) {
    try {
      const newAttempt = await prisma.attempt.create({
        data: {
          user: {
            connect: {
              id: body.userId,
            },
          },
          questionnaire: {
            connect: {
              id: body.questionnaireId,
            },
          },
          selectedAnswers: {
            create: [
              {
                answer: {
                  connect: {
                    id: body.answerId,
                  },
                },
              },
            ],
          },
        },
      });
      const answer = await prisma.answer.findUnique({
        where: {
          id: body.answerId,
          question: {
            id: body.questionId,
            questionnaireId: body.questionnaireId,
          },
        },
        select: {
          isCorrect: true,
        },
      });
      const correctAnswer = await prisma.question.findUnique({
        where: {
          id: body.questionId,
        },
        select: {
          answers: {
            where: {
              isCorrect: true,
            },
          },
        },
      });
      return Response.json(
        {
          isCorrect: answer?.isCorrect,
          correctAnswer: correctAnswer?.answers[0],
        },
        { status: 200 },
      );
    } catch (error) {
      return Response.json({ message: error }, { status: 500 });
    }
  } else {
    const isQuestionAlreadyAnswered = attempt.selectedAnswers.find(
      (selectedAnswer) => selectedAnswer.answerId === body.answerId,
    );
    if (isQuestionAlreadyAnswered) {
      return Response.json(
        { message: "Question is already answered" },
        { status: 400 },
      );
    } else {
      try {
        const newAttempt = await prisma.attempt.update({
          where: {
            id: attempt.id,
          },
          data: {
            selectedAnswers: {
              create: [
                {
                  answer: {
                    connect: {
                      id: body.answerId,
                    },
                  },
                },
              ],
            },
          },
        });
        const answer = await prisma.answer.findUnique({
          where: {
            id: body.answerId,
            question: {
              id: body.questionId,
              questionnaireId: body.questionnaireId,
            },
          },
          select: {
            isCorrect: true,
          },
        });
        const correctAnswer = await prisma.question.findUnique({
          where: {
            id: body.questionId,
          },
          select: {
            answers: {
              where: {
                isCorrect: true,
              },
            },
          },
        });
        return Response.json(
          {
            isCorrect: answer?.isCorrect,
            correctAnswer: correctAnswer?.answers[0],
          },
          { status: 200 },
        );
      } catch (error) {
        return Response.json({ message: error }, { status: 500 });
      }
    }
  }
}
