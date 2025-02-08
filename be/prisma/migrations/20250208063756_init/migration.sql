/*
  Warnings:

  - A unique constraint covering the columns `[testName]` on the table `TestTypes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestTypes_testName_key" ON "TestTypes"("testName");
