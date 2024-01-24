import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  params: { params: { id: string } },
) {
  const id = parseInt(params.params.id);

  const questionnaire = await prisma.questionnaire.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
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

  return Response.json({ ...questionnaire });
}
