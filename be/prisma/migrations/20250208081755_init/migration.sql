/*
  Warnings:

  - You are about to drop the column `questionId` on the `BookingTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookingTest" DROP COLUMN "questionId",
ADD COLUMN     "questionUrl" TEXT,
ALTER COLUMN "resultId" DROP NOT NULL,
ALTER COLUMN "resulUrl" DROP NOT NULL;
