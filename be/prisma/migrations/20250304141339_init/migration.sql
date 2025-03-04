-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Online';

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "fileId" TEXT,
    "description" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_fileId_key" ON "News"("fileId");
