-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "link" SET DEFAULT 'null';
