-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "fileId" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "specialist" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTime" (
    "id" SERIAL NOT NULL,
    "servicesId" INTEGER NOT NULL,
    "senin" BOOLEAN NOT NULL DEFAULT true,
    "startTimeSenin" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeSenin" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selasa" BOOLEAN NOT NULL DEFAULT true,
    "startTimeSelasa" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeSelasa" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rabu" BOOLEAN NOT NULL DEFAULT true,
    "startTimeRabu" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeRabu" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kamis" BOOLEAN NOT NULL DEFAULT true,
    "startTimeKamis" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeKamis" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumat" BOOLEAN NOT NULL DEFAULT true,
    "startTimeJumat" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeJumat" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sabtu" BOOLEAN NOT NULL DEFAULT true,
    "startTimeSabtu" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeSabtu" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minggu" BOOLEAN NOT NULL DEFAULT true,
    "startTimeMinggu" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimeMinggu" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Online',
    "dateTime" TIMESTAMP(3) NOT NULL,
    "linkClient" TEXT,
    "linkHost" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidate" BOOLEAN,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Educations" (
    "id" SERIAL NOT NULL,
    "educationLevel" TEXT NOT NULL,

    CONSTRAINT "Educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestTypes" (
    "id" SERIAL NOT NULL,
    "educationId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "testName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "TestTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingTest" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "testTypeId" INTEGER NOT NULL,
    "fileId" TEXT,
    "resultUrl" TEXT,
    "questionUrl" TEXT,
    "isValidate" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_fileId_key" ON "News"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_email_key" ON "Doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Services_serviceName_key" ON "Services"("serviceName");

-- CreateIndex
CREATE UNIQUE INDEX "Educations_educationLevel_key" ON "Educations"("educationLevel");

-- CreateIndex
CREATE UNIQUE INDEX "BookingTest_fileId_key" ON "BookingTest"("fileId");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTime" ADD CONSTRAINT "ServiceTime_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestTypes" ADD CONSTRAINT "TestTypes_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestTypes" ADD CONSTRAINT "TestTypes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTest" ADD CONSTRAINT "BookingTest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTest" ADD CONSTRAINT "BookingTest_testTypeId_fkey" FOREIGN KEY ("testTypeId") REFERENCES "TestTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
