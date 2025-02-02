const prisma = require('../libs/prisma.lib');
const moment = require('moment-timezone');

const formatTimeToWib = (isoString) => {
  const date = new Date(isoString);
  const wib = moment.utc(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
  return wib;
};

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
    res.json({ filteredAvailableTime });
  },

  booking: async (req, res, next) => {
    await prisma.bookings.create({
      data: {
        clientId: 1,
        serviceId: 5,
        dateTime: new Date(),
        link: 'asdf',
      },
    });
  },
};
