const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { exec } = require('child_process');
require('dotenv').config();
const { JOTFORM_API, SPREADSHEET_ID } = process.env;

// async function authorize() {
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

async function getQuestionsWithShuffledChoices(auth, type) {
  let lembar = '';
  if (type.toLowerCase().includes('belajar')) {
    lembar = 'Test Gaya Belajar';
  } else if (type.toLowerCase().includes('inteligensi')) {
    lembar = 'Test Inteligensi';
  } else if (type.toLowerCase().includes('kepribadian')) {
    lembar = 'Test Kepribadian';
  } else if (type.toLowerCase().includes('minat')) {
    lembar = 'Test Minat';
  } else if (type.toLowerCase().includes('psikologi')) {
    lembar = 'Test Gangguan Psikologi';
  } else if (type.toLowerCase().includes('pekerjaan')) {
    lembar = 'Test Rekruitmen Pekerjaan';
  } else {
    lembar = '';
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${lembar}!A1:Z1000`,
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
  const range = `${lembar}!A1:${String.fromCharCode(65 + numCols - 1)}${numRows}`;

  const dynamicResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    auth: auth,
  });

  let questions = dynamicResponse.data.values;
  questions = questions.map((row) => {
    let name = row[0];
    let type = row[1];
    let url = row[2];
    let question = row[3];
    let choices = [];
    for (let i = 4; i < row.length; i++) {
      choices.push(`${row[i]}`);
    }
    choices = shuffleChoices(choices); // Acak pilihan

    return {
      type: type,
      text: question,
      name: name,
      options: choices,
      url: url,
    };
  });

  questions = shuffleArray(questions); // Acak urutan soal
  return questions;
}

function shuffleChoices(choices) {
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices.join('|');
}

function shuffleArray(array) {
  for (let i = array.length - 3; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  createQuestion: async (type) => {
    try {
      const dataSpreadSheets = await getQuestionsWithShuffledChoices(auth, type);
      // res.json({ questions: dataSpreadSheets });
      console.log({ questions: dataSpreadSheets });

      // Membuat Form Baru
      const createFormCommand = `curl -X POST -d "questions[0][type]=control_head" -d "questions[0][text]=Jawab pertanyaan berikut, disini tidak ada jawaban benar ataupun salah" -d "questions[0][order]=1" -d "questions[0][name]=Header" -d "questions[1][type]=control_textbox" -d "questions[1][text]=Nama Lengkap" -d "questions[1][order]=2" -d "questions[1][name]=TextBox" -d "questions[1][validation]=None" -d "questions[1][required]=Yes" -d "questions[1][readonly]=No" -d "questions[1][size]=20" -d "questions[1][labelAlign]=Auto" -d "questions[1][hint]= " -d "properties[title]=Test Pesikolog" -d "properties[height]=600" "https://api.jotform.com/form?apiKey=${JOTFORM_API}"`;

      const formId = await new Promise((resolve, reject) => {
        exec(createFormCommand, (error, stdout) => {
          if (error) {
            return reject(`Gagal membuat form: ${error.message}`);
          }
          const response = JSON.parse(stdout);
          if (response.responseCode !== 200) {
            return reject(`Gagal membuat form: ${response.message}`);
          }
          resolve(response.content.id);
        });
      });

      const questions = [
        // {
        //   type: 'control_textbox',
        //   text: 'Jawab pertanyaan ini',
        //   name: 'clickTo',
        //   order: '3'
        // },
        // {
        //   type: 'control_textbox',
        //   text: 'Nama Lengkap',
        //   name: 'TextBox',
        // },
        // {
        //   type: 'control_textarea',
        //   text: 'Describe yourself',
        //   name: 'TextArea',
        // },
        {
          type: 'control_radio',
          text: 'Warna Favorit',
          name: 'favoriteColor',
          options: 'Red|Green|Blue|Yellow',
          order: '3',
        },
        {
          type: 'control_image',
          text: 'Lihat gambar berikut dan jawab pertanyaan.',
          name: 'questionImage',
          url: 'https://cdn1-production-images-kly.akamaized.net/w3Lx3L4iTX2sz_ZQ13IZ1cpgddI=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2160965/original/058483900_1525515185-iStock-640299760.jpg',
          order: '4',
        },
        {
          type: 'control_radio',
          text: 'Apa yang kamu lihat pada gambar diatas?',
          name: 'imageAnswer',
          options:
            '<img src="https://cdn1-production-images-kly.akamaized.net/w3Lx3L4iTX2sz_ZQ13IZ1cpgddI=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2160965/original/058483900_1525515185-iStock-640299760.jpg" width="100">|<img src="https://cdn.antaranews.com/cache/1200x800/2022/09/16/elvicto.jpg" width="100">|<img src="https://res.cloudinary.com/dk0z4ums3/image/upload/v1672644823/attached_image/muka-kusam-kenali-penyebab-dan-cara-mengatasinya.jpg" width="100">',
          order: '5',
        },
      ];

      // Menambahkan Pertanyaan Satu per Satu
      for (const question of dataSpreadSheets) {
        order = 3;
        const createQuestions = `curl -X POST -d "question[type]=${question.type}" -d "question[text]=${question.text}" -d "question[order]=${order}" -d "question[name]=${question.name}" ${
          question.url ? `-d "question[src]=${question.url}"` : ''
        } ${question.options ? `-d "question[options]=${question.options}"` : ''} "https://api.jotform.com/form/${formId}/questions?apiKey=${JOTFORM_API}"`;

        await new Promise((resolve, reject) => {
          exec(createQuestions, (error, stdout) => {
            if (error) return reject(`Gagal membuat pertanyaan: ${error.message}`);
            const response = JSON.parse(stdout);
            if (response.responseCode !== 200) return reject(`Gagal membuat pertanyaan: ${response.message}`);
            resolve(response);
          });
        });
        order++;
      }

      const send = `curl -X POST -d "question[type]=control_button" -d "question[text]=Kirim" -d "question[order]=${dataSpreadSheets.length + 5}" -d "question[name]=${
        dataSpreadSheets.length + 5
      }" -d "question[required]=Yes" "https://api.jotform.com/form/${formId}/questions?apiKey=${JOTFORM_API}"`;
      await new Promise((resolve, reject) => {
        exec(send, (error, stdout) => {
          if (error) {
            return reject(`Gagal membuat button kirim: ${error.message}`);
          }
          const response = JSON.parse(stdout);
          if (response.responseCode !== 200) {
            return reject(`Gagal membuat button kirim: ${response.message}`);
          }
          resolve(response);
        });
      });

      return { formId };
      //   res.send('Semua proses selesai.');
    } catch (err) {
      console.error(err);
    }
  },

  getAnswer: async (formId) => {
    try {
      const answers = `curl -X GET "https://api.jotform.com/form/${formId}/submissions?apiKey=${JOTFORM_API}`;
      let a = await new Promise((resolve, reject) => {
        exec(answers, (error, stdout) => {
          if (error) {
            return reject(`failed to retrieve the answer: ${error.message}`);
          }
          const response = JSON.parse(stdout);
          if (response.responseCode !== 200) {
            return reject(`failed to retrieve the answer: ${response.message}`);
          }
          resolve(response);
        });
      });

      return { answers: a.content };
    } catch (err) {
      console.error(err);
    }
  },
};
