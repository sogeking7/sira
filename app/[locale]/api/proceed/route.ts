import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const userId = body.userId;
  const quizId = body.quizId;
  const answerId = body.answerId;
  const questionId = body.questionId;

  const attempt = await prisma.attempt.findFirst({
    where: {
      userId,
      questionnaireId: quizId,
    },
    include: {
      selectedAnswers: {
        include: {
          answer: true
        }
      },
    },
  });

  const isQuestionAlreadyAnswered = attempt.selectedAnswers.find(
    (val: any) => val.answer.questionId === questionId,
  );

  if (isQuestionAlreadyAnswered) {
    return Response.json(
      { message: "You have already answered the question" },
      { status: 400 },
    );
  }

  const updatedAttempt = await prisma.attempt.update({
    where: {
      id: attempt.id,
    },
    data: {
      selectedAnswers: {
        create: [
          {
            answer: {
              connect: {
                id: answerId,
              },
            },
          },
        ],
      },
    },
    include: {
      selectedAnswers: true
    }
  });

  return Response.json({
    ...updatedAttempt,
    message: "Your answer has been saved",
  });
}
