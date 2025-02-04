/*
  Warnings:

  - You are about to drop the column `link` on the `Bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "link",
ADD COLUMN     "linkClient" TEXT,
ADD COLUMN     "linkHost" TEXT;
