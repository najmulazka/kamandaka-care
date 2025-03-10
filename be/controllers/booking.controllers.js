const createMeeting = require('../libs/meet.lib');
const { sendEmail, getHtml } = require('../libs/nodemailer.lib');
const prisma = require('../libs/prisma.lib');
const { formatTimeToWib } = require('../libs/formatTimeToWib.libs');
const moment = require('moment-timezone');
moment.locale('id');
const { CLIENT_EMAIL } = process.env;

// const formatTimeToWib 'YYYY-MM-DD HH:mm:ss',= (isoString) => {
//   const date = new Date(isoString);
//   const wib = moment.utc(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
//   return wib;
// };

// const formatTimeToUtc = (hhmm) => {
//   const clean = hhmm.trim();
//   const date = new Date(`1990-01-01 ${clean}:00.000`);
//   const a = moment.tz(date, 'Asia/Jakarta').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
//   return a;
// };

module.exports = {
  scheedule: async (req, res, next) => {
    const { serviceId, day, date, month, year } = req.body;
    const generateHourlySlots = (start, end) => {
      let slots = [];
      let current = moment.utc(start).tz('Asia/Jakarta').startOf('hour');

      while (current.isSameOrBefore(moment.utc(end).tz('Asia/Jakarta'))) {
        slots.push(current.format('HH:mm'));
        current.add(1, 'hour');
      }

      return slots;
    };

    const services = await prisma.services.findUnique({
      where: { id: Number(serviceId) },
      include: { serviceTime: true },
    });

    const available = services.serviceTime[0][day.toLowerCase()];
    if (!available) return res.sendResponse(200, 'OK', '', []);

    const startTime = `startTime${day}`;
    const endTime = `endTime${day}`;
    const availableTime = generateHourlySlots(services.serviceTime[0][startTime], services.serviceTime[0][endTime]);

    const wib = new Date(`${year}-${month}-${date} 00:00:00.000`);
    const a = moment.tz(wib, 'Asia/Jakarta').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const booking = await prisma.bookings.findMany({
      where: {
        serviceId: Number(serviceId),
        dateTime: { gte: new Date(a) },
        isValidate: true,
      },
    });

    let booked = [];
    while (booked.length < booking.length) {
      booked.push(formatTimeToWib('YYYY-MM-DD HH:mm:ss', booking[booked.length].dateTime));
    }

    const formatHhMm = booked.map((w) => moment(w, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Jakarta').format('HH:mm'));
    const filteredAvailableTime = availableTime.filter((time) => !formatHhMm.includes(time));

    // Kekurangan -> tidak bisa buka diatas jam 7
    res.sendResponse(200, 'OK', null, filteredAvailableTime);
  },

  createBookingOffline: async (req, res, next) => {
    const { serviceId, date, month, year, time } = req.body;

    const wib = new Date(`${year}-${month}-${date} ${time}:00.000`);
    const toUtc = moment.tz(wib, 'Asia/Jakarta').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const client = await prisma.clients.findUnique({ where: { email: CLIENT_EMAIL } });

    const booking = await prisma.bookings.create({
      data: {
        clientId: Number(client.id),
        serviceId: Number(serviceId),
        type: 'Offline',
        dateTime: new Date(`${toUtc}`),
        isValidate: true,
      },
    });

    res.sendResponse(201, 'Created', null, booking);
  },

  createBooking: async (req, res, next) => {
    const { serviceId, date, month, year, time } = req.body;

    const wib = new Date(`${year}-${month}-${date} ${time}:00.000`);
    const toUtc = moment.tz(wib, 'Asia/Jakarta').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const booking = await prisma.bookings.create({
      data: {
        clientId: req.client.id,
        serviceId: Number(serviceId),
        dateTime: new Date(`${toUtc}`),
      },
    });

    res.sendResponse(201, 'Created', null, booking);
  },

  validateBooking: async (req, res, next) => {
    const { id } = req.params;
    const { isValidate } = req.body;

    const validateBooking = await prisma.bookings.update({
      where: { id: Number(id) },
      data: { isValidate },
      include: {
        clients: {
          select: {
            fullName: true,
            email: true,
          },
        },
        services: {
          include: {
            doctors: {
              select: { fullName: true, email: true },
            },
          },
        },
      },
    });

    if (validateBooking.isValidate) {
      const linkMeet = await createMeeting(formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime));

      await prisma.bookings.update({
        where: { id: Number(id) },
        data: { linkClient: linkMeet.linkClient, linkHost: linkMeet.linkHost },
      });

      const html = await getHtml('booking-successfull.ejs', {
        client: {
          fullName: validateBooking.clients.fullName,
          dateTime: formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime),
          linkZoom: linkMeet.linkClient,
          service: validateBooking.services.serviceName,
        },
      });

      const htmlDoctor = await getHtml('get-booking.ejs', {
        doctor: {
          fullName: validateBooking.services.doctors.fullName,
          dateTime: formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime),
          linkZoom: linkMeet.linkHost,
          service: validateBooking.services.serviceName,
        },
      });

      await sendEmail(validateBooking.clients.email, 'Konfirmasi Booking & Link Zoom Meeting', html);
      await sendEmail(validateBooking.services.doctors.email, 'Konfirmasi Booking & Link Zoom Meeting', htmlDoctor);
    }

    if (!validateBooking.isValidate) {
      const html = await getHtml('booking-failed.ejs', {
        client: {
          fullName: validateBooking.clients.fullName,
          dateTime: formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime),
          service: validateBooking.services.serviceName,
        },
      });

      await sendEmail(validateBooking.clients.email, 'Booking Layanan Konsultasi Gagal', html);
    }

    res.sendResponse(200, 'OK', null, validateBooking);
  },

  getBookings: async (req, res, next) => {
    try {
      let { date, month, year } = req.query;
      let where = {};

      if (date && month && year) {
        const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}T17:00:00.000Z`);
        startDate.setUTCDate(startDate.getUTCDate() - 1);
        const endDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}T17:00:00.000Z`);
        console.log(startDate);
        console.log(endDate);

        where.dateTime = {
          gte: startDate,
          lt: endDate,
        };
        where.isValidate = true;
      } else if (month && year) {
        const startMonth = new Date(`${year}-${String(month).padStart(2, '0')}-01T17:00:00.000Z`);
        startMonth.setUTCDate(startMonth.getUTCDate() - 1);
        const endMonth = new Date(`${year}-${String(month).padStart(2, '0')}-01T17:00:00.000Z`);
        endMonth.setUTCMonth(endMonth.getUTCMonth() + 1);
        endMonth.setUTCDate(endMonth.getUTCDate() - 1);
        console.log(startMonth);
        console.log(endMonth);

        where.dateTime = {
          gte: startMonth,
          lt: endMonth,
        };
        where.isValidate = true;
      } else if (year && !month && !date) {
        const startYear = new Date(`${year}-01-01T17:00:00.000Z`);
        startYear.setUTCDate(startYear.getUTCDate() - 1);
        const endYear = new Date(`${year}-01-01T17:00:00.000Z`);
        endYear.setUTCFullYear(endYear.getUTCFullYear() + 1);
        endYear.setUTCDate(endYear.getUTCDate() - 1);
        console.log(startYear);
        console.log(endYear);

        where.dateTime = {
          gte: startYear,
          lt: endYear,
        };
        where.isValidate = true;
      }

      const bookings = await prisma.bookings.findMany({
        where,
        include: {
          clients: true,
          services: {
            include: {
              doctors: {
                select: { fullName: true, specialist: true },
              },
            },
          },
        },
        orderBy: [
          {
            isValidate: { nulls: 'first', sort: 'asc' },
          },
          { dateTime: 'desc' },
        ],
      });

      const bookingsWithWIB = bookings.map((booking) => ({
        ...booking,
        dateTime: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.dateTime),
        createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
      }));

      console.log('time : ', new Date());

      res.sendResponse(200, 'OK', null, bookingsWithWIB);
    } catch (err) {
      next(err);
    }
  },

  getBookingsDoctor: async (req, res, next) => {
    const bookings = await prisma.bookings.findMany({
      where: { services: { doctors: { id: req.doctor.id } } },
      include: {
        clients: true,
        services: {
          include: {
            doctors: {
              select: { fullName: true, specialist: true },
            },
          },
        },
      },
      orderBy: { dateTime: 'desc' },
    });

    const bookingsWithWIB = bookings.map((booking) => ({
      ...booking,
      dateTime: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.dateTime),
      createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
    }));

    res.sendResponse(200, 'OK', null, bookingsWithWIB);
  },

  getBookingsClient: async (req, res, next) => {
    const bookings = await prisma.bookings.findMany({
      where: { clientId: req.client.id },
      include: {
        clients: true,
        services: {
          include: {
            doctors: {
              select: { fullName: true, specialist: true },
            },
          },
        },
      },
      orderBy: [
        {
          isValidate: {
            nulls: 'first',
            sort: 'asc',
          },
        },
        { id: 'desc' },
      ],
    });

    const bookingsWithWIB = bookings.map((booking) => ({
      ...booking,
      dateTime: moment.utc(booking.dateTime).tz('Asia/Jakarta').format('dddd, YYYY-MM-DD HH:mm:ss'),
      createdAt: moment.utc(booking.createdAt).tz('Asia/Jakarta').format('dddd, YYYY-MM-DD HH:mm:ss'),
    }));

    res.sendResponse(200, 'OK', null, bookingsWithWIB);
  },

  autoInvalidBooking: async () => {
    const timeNow = new Date();
    timeNow.setUTCHours(timeNow.getUTCHours() - 3);

    await prisma.bookings.updateMany({
      where: {
        isValidate: null,
        createdAt: { lt: timeNow },
      },
      data: {
        isValidate: false,
      },
    });
  },
};
