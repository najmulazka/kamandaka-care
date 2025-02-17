-- DropForeignKey
ALTER TABLE "BookingTest" DROP CONSTRAINT "BookingTest_clientId_fkey";

-- DropForeignKey
ALTER TABLE "BookingTest" DROP CONSTRAINT "BookingTest_testTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTime" DROP CONSTRAINT "ServiceTime_servicesId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "TestTypes" DROP CONSTRAINT "TestTypes_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "TestTypes" DROP CONSTRAINT "TestTypes_educationId_fkey";

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
