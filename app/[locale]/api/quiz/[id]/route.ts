import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const questionnaireId = parseInt(params.id);

  const questionnaire = await prisma.questionnaire.findFirst({
    where: {
      id: questionnaireId,
    },
    select: {
      questions: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
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

  return Response.json(questionnaire?.questions);
}
