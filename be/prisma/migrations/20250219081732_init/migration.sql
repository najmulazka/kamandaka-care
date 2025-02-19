/*
  Warnings:

  - A unique constraint covering the columns `[serviceName]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Services_serviceName_key" ON "Services"("serviceName");
