/*
  Warnings:

  - You are about to drop the column `resulUrl` on the `BookingTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookingTest" DROP COLUMN "resulUrl",
ADD COLUMN     "resultUrl" TEXT;
