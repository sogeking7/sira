import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const phone = body.phone;
  const quizId = body.quizId;
  const collectedAnswers = body.collectedAnswers;

  const attempt = await prisma.attempt.findFirst({
    where: {
      user: {
        phone,
      },
      questionnaireId: quizId,
    },
    include: {
      selectedAnswers: {
        include: {
          answer: true,
        },
      },
    },
  });

  if (!attempt || !attempt.selectedAnswers) {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    const newAttempt = await prisma.attempt.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        questionnaire: {
          connect: {
            id: quizId,
          },
        },
        selectedAnswers: {
          create: collectedAnswers.map((val: any) => ({
            answer: {
              connect: {
                id: val.id,
              },
            },
          })),
        },
      },
    });

    const correctAnswerCount =
      newAttempt?.selectedAnswers?.filter((val: any) => val.answer?.isCorrect)
        .length || 0;

    return Response.json({
      correctAnswerCount,
      message: "Your answers have been saved",
    });
  }

  return Response.json(
    { message: "This phone number is already taken" },
    { status: 400 },
  );
}
