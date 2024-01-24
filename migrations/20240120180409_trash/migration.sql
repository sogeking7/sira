/*
  Warnings:

  - The values [notStarted] on the enum `AttemptState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttemptState_new" AS ENUM ('running', 'finished');
ALTER TABLE "Attempt" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Attempt" ALTER COLUMN "state" TYPE "AttemptState_new" USING ("state"::text::"AttemptState_new");
ALTER TYPE "AttemptState" RENAME TO "AttemptState_old";
ALTER TYPE "AttemptState_new" RENAME TO "AttemptState";
DROP TYPE "AttemptState_old";
ALTER TABLE "Attempt" ALTER COLUMN "state" SET DEFAULT 'running';
COMMIT;

-- AlterTable
ALTER TABLE "Attempt" ALTER COLUMN "state" SET DEFAULT 'running';
