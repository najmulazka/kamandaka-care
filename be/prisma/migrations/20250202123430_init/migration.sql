/*
  Warnings:

  - A unique constraint covering the columns `[serviceName]` on the table `Services` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `startTimeSenin` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeSenin` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimeSelasa` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeSelasa` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimeRabu` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeRabu` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimeKamis` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeKamis` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimeJumat` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeJumat` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimeSabtu` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeSabtu` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimeMinggu` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimeMinggu` on the `ServiceTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ServiceTime" DROP COLUMN "startTimeSenin",
ADD COLUMN     "startTimeSenin" TIME NOT NULL,
DROP COLUMN "endTimeSenin",
ADD COLUMN     "endTimeSenin" TIME NOT NULL,
DROP COLUMN "startTimeSelasa",
ADD COLUMN     "startTimeSelasa" TIME NOT NULL,
DROP COLUMN "endTimeSelasa",
ADD COLUMN     "endTimeSelasa" TIME NOT NULL,
DROP COLUMN "startTimeRabu",
ADD COLUMN     "startTimeRabu" TIME NOT NULL,
DROP COLUMN "endTimeRabu",
ADD COLUMN     "endTimeRabu" TIME NOT NULL,
DROP COLUMN "startTimeKamis",
ADD COLUMN     "startTimeKamis" TIME NOT NULL,
DROP COLUMN "endTimeKamis",
ADD COLUMN     "endTimeKamis" TIME NOT NULL,
DROP COLUMN "startTimeJumat",
ADD COLUMN     "startTimeJumat" TIME NOT NULL,
DROP COLUMN "endTimeJumat",
ADD COLUMN     "endTimeJumat" TIME NOT NULL,
DROP COLUMN "startTimeSabtu",
ADD COLUMN     "startTimeSabtu" TIME NOT NULL,
DROP COLUMN "endTimeSabtu",
ADD COLUMN     "endTimeSabtu" TIME NOT NULL,
DROP COLUMN "startTimeMinggu",
ADD COLUMN     "startTimeMinggu" TIME NOT NULL,
DROP COLUMN "endTimeMinggu",
ADD COLUMN     "endTimeMinggu" TIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Services_serviceName_key" ON "Services"("serviceName");
