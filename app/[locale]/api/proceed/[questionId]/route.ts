import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: { questionId: string } },
) {
  const questionId = parseInt(params.questionId);

  const question = await prisma.question.findFirst({
    where: {
      id: questionId,
    },
    include: {
      answers: {
        where: {
          isCorrect: true,
        },
      },
    },
  });

  const correctAnswer = question?.answers[0];

  return Response.json(correctAnswer);
}
