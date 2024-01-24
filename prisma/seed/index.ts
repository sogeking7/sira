import { PrismaClient } from "@prisma/client";
import { quiz } from "./00-quiz";

const prisma = new PrismaClient();

async function main() {
  const questionnaire = await prisma.questionnaire.create({
    data: {
      title: "Quiz",
    },
  });

  quiz.forEach(async (question, questionIndex) => {
    const newQuestion = await prisma.question.create({
      data: {
        questionnaireId: questionnaire.id,
        title: question.title,
        imageUrl: `/quiz/${questionIndex + 1}.png`,
      },
    });
    question.answers.forEach(async (answer, answerIndex) => {
      await prisma.question.update({
        where: {
          id: newQuestion.id,
        },
        data: {
          answers: {
            create: {
              title: answer,
              isCorrect: answerIndex === question.correctAnswerIndex,
            },
          },
        },
      });
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
