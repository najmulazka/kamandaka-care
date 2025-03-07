require('dotenv').config();
const { google } = require('googleapis');
const prisma = require('./prisma.lib');
const sheets = google.sheets('v4');
const moment = require('moment-timezone');
moment.locale('id');
const { SPREADSHEET_ANSWER_ID_INTELIGENSI, SPREADSHEET_ANSWER_ID_GAYA_BELAJAR, SPREADSHEET_ANSWER_ID_KEPRIBADIAN, SPREADSHEET_ANSWER_ID_MINAT, SPREADSHEET_ANSWER_ID_GANGGUAN_PSIKOLOGI, SPREADSHEET_ANSWER_ID_REKRUITMEN_PEKERJAAN } =
  process.env;

const formatTimeToWib = (isoString) => {
  const date = new Date(isoString);
  const wib = moment.utc(date).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss');
  return wib;
};

const auth = new google.auth.GoogleAuth({
  // keyFile: 'credentials.json',
  keyFile: 'credentialskamcare.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

let SPREADSHEET_ID = '';
async function getAnswerr(auth, id, testName, email) {
  if (testName.toLowerCase().includes('inteligensi')) {
    SPREADSHEET_ID = SPREADSHEET_ANSWER_ID_INTELIGENSI;
  } else if (testName.toLowerCase().includes('belajar')) {
    SPREADSHEET_ID = SPREADSHEET_ANSWER_ID_GAYA_BELAJAR;
  } else if (testName.toLowerCase().includes('kepribadian')) {
    SPREADSHEET_ID = SPREADSHEET_ANSWER_ID_KEPRIBADIAN;
  } else if (testName.toLowerCase().includes('minat')) {
    SPREADSHEET_ID = SPREADSHEET_ANSWER_ID_MINAT;
  } else if (testName.toLowerCase().includes('psikologi')) {
    SPREADSHEET_ID = SPREADSHEET_ANSWER_ID_GANGGUAN_PSIKOLOGI;
  } else if (testName.toLowerCase().includes('pekerjaan')) {
    SPREADSHEET_ID = SPREADSHEET_ANSWER_ID_REKRUITMEN_PEKERJAAN;
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `Form Responses 1!A1:Z1000`,
    auth: auth,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }

  // Hitung jumlah kolom dan baris yang terisi
  const numRows = rows.length;
  const numCols = rows[0].length;

  // Tentukan rentang berdasarkan baris dan kolom yang terisi
  const range = `Form Responses 1!A1:${String.fromCharCode(65 + numCols - 1)}${numRows}`;

  const dynamicResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    auth: auth,
  });

  let questions = dynamicResponse.data.values;
  const keys = questions[0];

  // Convert the rest of the rows into objects
  const data = questions.slice(1).map((row) => {
    return row.reduce((obj, value, index) => {
      obj[keys[index]] = value;
      return obj;
    }, {});
  });

  const bookingTest = await prisma.bookingTest.findUnique({ where: { id: Number(id) } });
  bookingTest.createdAt = formatTimeToWib(bookingTest.createdAt);

  const userExist = data.filter((item) => item['Email Address'] == email).sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)) || [];
  const firstLargerTimestamp = userExist.find(({ Timestamp }) => {
    return Timestamp > bookingTest.createdAt;
  });
  console.log(firstLargerTimestamp);
  return firstLargerTimestamp ? firstLargerTimestamp : {};
}

module.exports = {
  getAnswerr: async (id, testName, email) => {
    try {
      const dataSpreadSheets = await getAnswerr(auth, id, testName, email);
      // res.json({ questions: dataSpreadSheets });
      return dataSpreadSheets;
    } catch (err) {
      console.log(err.message);
    }
  },
};
