/*
  Warnings:

  - You are about to drop the column `currentQuestionId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `currentQuestionnaireId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResultOnAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_currentQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_currentQuestionnaireId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_questionnaireId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResultOnAnswer" DROP CONSTRAINT "ResultOnAnswer_answerId_fkey";

-- DropForeignKey
ALTER TABLE "ResultOnAnswer" DROP CONSTRAINT "ResultOnAnswer_resultId_fkey";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "currentQuestionId",
DROP COLUMN "currentQuestionnaireId",
DROP COLUMN "state",
ADD COLUMN     "questionnaireId" INTEGER;

-- DropTable
DROP TABLE "Result";

-- DropTable
DROP TABLE "ResultOnAnswer";

-- DropEnum
DROP TYPE "AttemptState";

-- CreateTable
CREATE TABLE "AttemptOnAnswers" (
    "id" SERIAL NOT NULL,
    "attemptId" INTEGER,
    "answerId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttemptOnAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptOnAnswers" ADD CONSTRAINT "AttemptOnAnswers_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptOnAnswers" ADD CONSTRAINT "AttemptOnAnswers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
