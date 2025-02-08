/*
  Warnings:

  - You are about to drop the column `Price` on the `TestTypes` table. All the data in the column will be lost.
  - Added the required column `price` to the `TestTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestTypes" DROP COLUMN "Price",
ADD COLUMN     "price" TEXT NOT NULL;
