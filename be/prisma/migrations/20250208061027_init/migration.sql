/*
  Warnings:

  - A unique constraint covering the columns `[educationLevel]` on the table `Education` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Education_educationLevel_key" ON "Education"("educationLevel");
