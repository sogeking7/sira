/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `resultId` on the `Answer` table. All the data in the column will be lost.
  - The `id` column on the `Answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `questionTitle` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaireTitle` on the `Questionnaire` table. All the data in the column will be lost.
  - Added the required column `title` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttemptState" AS ENUM ('running', 'finished', 'notStarted');

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_resultId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
DROP COLUMN "description",
DROP COLUMN "resultId",
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionTitle",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "questionnaireTitle",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ResultOnAnswer" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER,
    "answerId" INTEGER,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultOnAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" SERIAL NOT NULL,
    "state" "AttemptState" NOT NULL DEFAULT 'notStarted',
    "userId" TEXT,
    "currentQuestionnaireId" INTEGER,
    "currentQuestionId" INTEGER,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResultOnAnswer" ADD CONSTRAINT "ResultOnAnswer_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultOnAnswer" ADD CONSTRAINT "ResultOnAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_currentQuestionnaireId_fkey" FOREIGN KEY ("currentQuestionnaireId") REFERENCES "Questionnaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_currentQuestionId_fkey" FOREIGN KEY ("currentQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
