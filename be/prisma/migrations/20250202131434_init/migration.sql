/*
  Warnings:

  - Added the required column `servicesId` to the `ServiceTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceTime" ADD COLUMN     "servicesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ServiceTime" ADD CONSTRAINT "ServiceTime_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
