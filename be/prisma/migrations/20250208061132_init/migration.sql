/*
  Warnings:

  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestTypes" DROP CONSTRAINT "TestTypes_educationId_fkey";

-- DropTable
DROP TABLE "Education";

-- CreateTable
CREATE TABLE "Educations" (
    "id" SERIAL NOT NULL,
    "educationLevel" TEXT NOT NULL,

    CONSTRAINT "Educations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Educations_educationLevel_key" ON "Educations"("educationLevel");

-- AddForeignKey
ALTER TABLE "TestTypes" ADD CONSTRAINT "TestTypes_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Educations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
