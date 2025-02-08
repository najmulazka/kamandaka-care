-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "price" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "educationLevel" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestTypes" (
    "id" SERIAL NOT NULL,
    "educationId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "testName" TEXT NOT NULL,
    "Price" TEXT NOT NULL,

    CONSTRAINT "TestTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingTest" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "testTypeId" INTEGER NOT NULL,
    "resultId" TEXT NOT NULL,
    "resulUrl" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "isValidate" BOOLEAN,

    CONSTRAINT "BookingTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestTypes" ADD CONSTRAINT "TestTypes_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestTypes" ADD CONSTRAINT "TestTypes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTest" ADD CONSTRAINT "BookingTest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTest" ADD CONSTRAINT "BookingTest_testTypeId_fkey" FOREIGN KEY ("testTypeId") REFERENCES "TestTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
