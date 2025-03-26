const moment = require('moment-timezone');
moment.locale('id');
const prisma = require('../libs/prisma.lib');
const gmeet = require('../libs/gmeet.libs');
const { sendEmail, getHtml } = require('../libs/nodemailer.lib');
const { formatTimeToWib } = require('../libs/formatTimeToWib.libs');
const { CLIENT_EMAIL } = process.env;

module.exports = {
  scheedule: async (req, res, next) => {
    const { serviceId, day, date, month, year } = req.body;
    const generateHourlySlots = (start, end) => {
      let slots = [];
      let current = moment.tz(start, 'Asia/Jakarta').startOf('hour');
      let endTime = moment.tz(end, 'Asia/Jakarta');

      while (current.isSameOrBefore(endTime)) {
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
        // isValidate: true,
        OR: [{ isValidate: true }, { isValidate: null }],
      },
    });

    const booked = booking.map((b) => formatTimeToWib('YYYY-MM-DD HH:mm:ss', b.dateTime));

    const formatHhMm = booked.map((w) => moment(w, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Jakarta').format('HH:mm'));
    const filteredAvailableTime = availableTime.filter((time) => !formatHhMm.includes(time));

    // Kekurangan -> tidak bisa buka diatas jam 7
    res.sendResponse(200, 'OK', null, filteredAvailableTime);
  },

  createBookingOffline: async (req, res, next) => {
    const { serviceId, date, month, year, time } = req.body;

    const wib = `${year}-${month}-${date} ${time}:00`;
    const toUtc = moment.tz(wib, 'Asia/Jakarta').utc().toDate();

    const client = await prisma.clients.findUnique({ where: { email: CLIENT_EMAIL } });

    const booking = await prisma.bookings.create({
      data: {
        clientId: Number(client.id),
        serviceId: Number(serviceId),
        type: 'Offline',
        dateTime: toUtc,
        isValidate: true,
      },
    });

    res.sendResponse(201, 'Created', null, booking);
  },

  createBooking: async (req, res, next) => {
    const { serviceId, date, month, year, time } = req.body;

    const wib = `${year}-${month}-${date} ${time}:00`;
    const toUtc = moment.tz(wib, 'Asia/Jakarta').utc().toDate();

    const booking = await prisma.bookings.create({
      data: {
        clientId: req.client.id,
        serviceId: Number(serviceId),
        dateTime: toUtc,
      },
    });

    res.sendResponse(201, 'Created', null, booking);
  },

  validateBooking: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { isValidate } = req.body;
      let linkMeet;

      const existBooking = await prisma.bookings.findUnique({
        where: { id: Number(id) },
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
      if (!existBooking) return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);

      if (isValidate) {
        linkMeet = await gmeet([{ email: existBooking.clients.email }, { email: existBooking.services.doctors.email }], existBooking.services.serviceName, formatTimeToWib('', existBooking.dateTime));
      }

      let emailPromises = [];
      if (isValidate) {
        const validateBooking = await prisma.bookings.update({
          where: { id: Number(id) },
          data: {
            isValidate,
            linkClient: linkMeet.data.hangoutLink,
            linkHost: linkMeet.data.hangoutLink,
          },
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

        const [html, htmlDoctor] = await Promise.all([
          getHtml('booking-successfull.ejs', {
            client: {
              fullName: validateBooking.clients.fullName,
              dateTime: formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime),
              linkZoom: linkMeet.data.hangoutLink,
              service: validateBooking.services.serviceName,
            },
          }),
          getHtml('get-booking.ejs', {
            doctor: {
              fullName: validateBooking.services.doctors.fullName,
              dateTime: formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime),
              linkZoom: linkMeet.data.hangoutLink,
              service: validateBooking.services.serviceName,
            },
          }),
        ]);

        emailPromises.push(sendEmail(validateBooking.clients.email, 'Konfirmasi Booking & Link Zoom Meeting', html), sendEmail(validateBooking.services.doctors.email, 'Konfirmasi Booking & Link Zoom Meeting', htmlDoctor));
      } else {
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
        const html = await getHtml('booking-failed.ejs', {
          client: {
            fullName: validateBooking.clients.fullName,
            dateTime: formatTimeToWib('YYYY-MM-DD HH:mm:ss', validateBooking.dateTime),
            service: validateBooking.services.serviceName,
          },
        });

        emailPromises.push(sendEmail(validateBooking.clients.email, 'Booking Layanan Konsultasi Gagal', html));
      }

      await Promise.all(emailPromises);
      res.sendResponse(200, 'OK', null, null);
    } catch (err) {
      next(err);
    }
  },

  getBookings: async (req, res, next) => {
    try {
      let { date, month, year } = req.query;
      let where = {};

      // if (date && month && year) {
      //   const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}T17:00:00.000Z`);
      //   startDate.setUTCDate(startDate.getUTCDate() - 1);
      //   const endDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}T17:00:00.000Z`);

      //   where.dateTime = {
      //     gte: startDate,
      //     lt: endDate,
      //   };
      //   where.isValidate = true;
      // } else if (month && year) {
      //   const startMonth = new Date(`${year}-${String(month).padStart(2, '0')}-01T17:00:00.000Z`);
      //   startMonth.setUTCDate(startMonth.getUTCDate() - 1);
      //   const endMonth = new Date(`${year}-${String(month).padStart(2, '0')}-01T17:00:00.000Z`);
      //   endMonth.setUTCMonth(endMonth.getUTCMonth() + 1);
      //   endMonth.setUTCDate(endMonth.getUTCDate() - 1);

      //   where.dateTime = {
      //     gte: startMonth,
      //     lt: endMonth,
      //   };
      //   where.isValidate = true;
      // } else if (year && !month && !date) {
      //   const startYear = new Date(`${year}-01-01T17:00:00.000Z`);
      //   startYear.setUTCDate(startYear.getUTCDate() - 1);
      //   const endYear = new Date(`${year}-01-01T17:00:00.000Z`);
      //   endYear.setUTCFullYear(endYear.getUTCFullYear() + 1);
      //   endYear.setUTCDate(endYear.getUTCDate() - 1);

      //   where.dateTime = {
      //     gte: startYear,
      //     lt: endYear,
      //   };
      //   where.isValidate = true;
      // }

      if (year) {
        let startDate, endDate;

        if (month) {
          if (date) {
            startDate = new Date(Date.UTC(year, month - 1, date, 0, 0, 0));
            endDate = new Date(Date.UTC(year, month - 1, date, 23, 59, 59));
          } else {
            startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
            endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));
          }
        } else {
          startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
          endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
        }
        where.dateTime = { gte: startDate, lt: endDate };
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
        orderBy: [{ dateTime: 'desc' }],
      });

      const bookingsWithWIB = bookings.map((booking) => ({
        ...booking,
        dateTime: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.dateTime),
        createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
      }));

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
