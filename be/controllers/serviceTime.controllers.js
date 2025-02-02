const prisma = require('../libs/prisma.lib');
const moment = require('moment-timezone');

const formatTimeToUtc = (hhmm) => {
  const clean = hhmm.trim();
  const date = new Date(`1990-01-01 ${clean}:00.000`);
  const a = moment.tz(date, 'Asia/Jakarta').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return a;
};

const formatTimeToWib = (isoString) => {
  const date = new Date(isoString);
  const wib = moment.utc(date).tz('Asia/Jakarta').format('HH:mm');
  return wib;
};

module.exports = {
  getServiceTimes: async (req, res, next) => {
    const serviceTimes = await prisma.serviceTime.findMany();
    console.log(serviceTimes);

    const formattedData = serviceTimes.map((item) => ({
      id: item.id,
      servicesId: item.servicesId,
      senin: item.senin,
      startTimeSenin: formatTimeToWib(item.startTimeSenin),
      endTimeSenin: formatTimeToWib(item.endTimeSenin),
      selasa: item.selasa,
      startTimeSelasa: formatTimeToWib(item.startTimeSelasa),
      endTimeSelasa: formatTimeToWib(item.endTimeSelasa),
      rabu: item.rabu,
      startTimeRabu: formatTimeToWib(item.startTimeRabu),
      endTimeRabu: formatTimeToWib(item.endTimeRabu),
      kamis: item.kamis,
      startTimeKamis: formatTimeToWib(item.startTimeKamis),
      endTimeKamis: formatTimeToWib(item.endTimeKamis),
      jumat: item.jumat,
      startTimeJumat: formatTimeToWib(item.startTimeJumat),
      endTimeJumat: formatTimeToWib(item.endTimeJumat),
      sabtu: item.sabtu,
      startTimeSabtu: formatTimeToWib(item.startTimeSabtu),
      endTimeSabtu: formatTimeToWib(item.endTimeSabtu),
      minggu: item.minggu,
      startTimeMinggu: formatTimeToWib(item.startTimeMinggu),
      endTimeMinggu: formatTimeToWib(item.endTimeMinggu),
    }));

    res.sendResponse(200, 'OK', null, formattedData);
  },

  updateServiceTime: async (req, res, next) => {
    const { id } = req.params;
    const {
      senin,
      startTimeSenin,
      endTimeSenin,
      selasa,
      startTimeSelasa,
      endTimeSelasa,
      rabu,
      startTimeRabu,
      endTimeRabu,
      kamis,
      startTimeKamis,
      endTimeKamis,
      jumat,
      startTimeJumat,
      endTimeJumat,
      sabtu,
      startTimeSabtu,
      endTimeSabtu,
      minggu,
      startTimeMinggu,
      endTimeMinggu,
    } = req.body;

    const serviceTimeExist = await prisma.serviceTime.findUnique({ where: { id: Number(id) } });
    if (!serviceTimeExist) return res.sendResponse(400, 'Bad request', 'Service does not exist', null);

    const serviceTime = await prisma.serviceTime.update({
      where: { id: Number(id) },
      data: {
        senin,
        startTimeSenin: formatTimeToUtc(startTimeSenin),
        endTimeSenin: formatTimeToUtc(endTimeSenin),
        selasa,
        startTimeSelasa: formatTimeToUtc(startTimeSelasa),
        endTimeSelasa: formatTimeToUtc(endTimeSelasa),
        rabu,
        startTimeRabu: formatTimeToUtc(startTimeRabu),
        endTimeRabu: formatTimeToUtc(endTimeRabu),
        kamis,
        startTimeKamis: formatTimeToUtc(startTimeKamis),
        endTimeKamis: formatTimeToUtc(endTimeKamis),
        jumat,
        startTimeJumat: formatTimeToUtc(startTimeJumat),
        endTimeJumat: formatTimeToUtc(endTimeJumat),
        sabtu,
        startTimeSabtu: formatTimeToUtc(startTimeSabtu),
        endTimeSabtu: formatTimeToUtc(endTimeSabtu),
        minggu,
        startTimeMinggu: formatTimeToUtc(startTimeMinggu),
        endTimeMinggu: formatTimeToUtc(endTimeMinggu),
      },
    });
    if (!serviceTime) return res.sendResponse(400, 'Bad request', 'error', null);

    res.sendResponse(200, 'OK', null, serviceTime);
  },
};
