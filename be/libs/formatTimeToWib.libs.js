const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
  formatTimeToWib: (format, isoString) => {
    const date = new Date(isoString);
    const wib = moment.utc(date).tz('Asia/Jakarta').format(format);
    return wib;
  },
};
