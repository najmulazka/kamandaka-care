const createMeeting = require('../libs/meet.lib');
const { sendEmail, getHtml } = require('../libs/nodemailer.lib');
const prisma = require('../libs/prisma.lib');
const moment = require('moment-timezone');

const formatTimeToWib = (isoString) => {
  const date = new Date(isoString);
  const wib = moment.utc(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
  return wib;
};

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
    if (!available) return res.sendResponse(200, 'OK', '', null);

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
      booked.push(formatTimeToWib(booking[booked.length].dateTime));
    }

    const formatHhMm = booked.map((w) => moment(w, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Jakarta').format('HH:mm'));
    const filteredAvailableTime = availableTime.filter((time) => !formatHhMm.includes(time));

    // Kekurangan -> tidak bisa buka diatas jam 7
    res.sendResponse(200, 'OK', null, filteredAvailableTime);
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
      const linkMeet = await createMeeting(formatTimeToWib(validateBooking.dateTime));

      await prisma.bookings.update({
        where: { id: Number(id) },
        data: { linkClient: linkMeet.linkClient, linkHost: linkMeet.linkHost },
      });

      const html = await getHtml('booking-successfull.ejs', {
        client: {
          fullName: validateBooking.clients.fullName,
          dateTime: formatTimeToWib(validateBooking.dateTime),
          linkZoom: validateBooking.linkClient,
          service: validateBooking.services.serviceName,
        },
      });

      const htmlDoctor = await getHtml('get-booking.ejs', {
        doctor: {
          fullName: validateBooking.services.doctors.fullName,
          dateTime: formatTimeToWib(validateBooking.dateTime),
          linkZoom: validateBooking.linkHost,
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
          dateTime: formatTimeToWib(validateBooking.dateTime),
          service: validateBooking.services.serviceName,
        },
      });

      await sendEmail(validateBooking.clients.email, 'Booking Layanan Konsultasi Gagal', html);
    }

    res.sendResponse(200, 'OK', null, validateBooking);
  },
};
