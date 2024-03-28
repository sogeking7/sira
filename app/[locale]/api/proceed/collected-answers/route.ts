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
    let user = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
        },
      });
    }

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
      include: {
        selectedAnswers: {
          include: {
            answer: true,
          },
        },
      },
    });

    const lastQuestionIndex = newAttempt?.selectedAnswers?.length - 1;
    const correctAnswerCount =
      newAttempt?.selectedAnswers?.filter((val: any) => val.answer?.isCorrect)
        .length || 0;
    const isFinished =
      lastQuestionIndex + 1 === newAttempt?.questionnaire?.questions?.length;

    return Response.json({
      newAttempt,
      id: newAttempt?.id,
      lastQuestionIndex,
      count: correctAnswerCount,
      message: "Your answers have been saved",
      isFinished,
    });
  }

  return Response.json(
    { type: "phone-taken", message: "This phone number is already taken" },
    { status: 400 },
  );
}
