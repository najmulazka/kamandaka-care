/*
  Warnings:

  - You are about to drop the column `resultId` on the `BookingTest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `BookingTest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionUrl]` on the table `BookingTest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BookingTest" DROP COLUMN "resultId",
ADD COLUMN     "fileId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BookingTest_fileId_key" ON "BookingTest"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingTest_questionUrl_key" ON "BookingTest"("questionUrl");
