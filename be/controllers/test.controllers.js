const { google } = require('googleapis');
const sheets = google.sheets('v4');
const forms = google.forms('v1');
const spreadsheetId = '1kX-oht-CJU5IvO_5PVIiVXBRl-BppXJ38byO0eoxdKc';
const formId = '1PEujxV05feXNKWMfBGAdMkt3ysl_Ynzmzu0ToPP5WOQ';
const axios = require('axios');
const { exec } = require('child_process');
require('dotenv').config();

// async function authorize() {
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

// // Set the refresh token
// const client = await auth.getClient();

// const googleSheets = google.sheets({ version: 'v4', client });
// const metaData = await googleSheets.spreadsheets.get({ auth, spreadsheetId });

// const getRows = await googleSheets.spreadsheets.values.get({
//   auth,
//   spreadsheetId,
//   range: 'Sheet1!A1:D3',
// });

//   return metaData;
// }

// async function getQuestionsWithShuffledChoices(auth) {
//   const response = await sheets.spreadsheets.values.get({
//     spreadsheetId,
//     range: 'Sheet1!A1:D3', // Soal di kolom A dan pilihan di kolom B-D
//     auth: auth,
//   });

//   let questions = response.data.values;
//   questions = questions.map((question) => {
//     let choices = question.slice(1); // Pilihan mulai dari kolom kedua
//     choices = shuffleChoices(choices); // Acak pilihan
//     return {
//       question: question[0], // Pertanyaan di kolom pertama
//       choices: choices,
//     };
//   });

//   questions = shuffleArray(questions); // Acak urutan soal
//   // res.send(questions);
//   // console.log(questions);
//   return questions;
// }

async function getQuestionsWithShuffledChoices(auth) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:G3', // Kolom A hingga G mencakup pertanyaan, pilihan, dan nilai
    auth: auth,
  });

  let questions = response.data.values;
  questions = questions.map((row) => {
    let question = row[0]; // Pertanyaan di kolom pertama
    // let choices = [];
    let choices = '';
    for (let i = 1; i < row.length; i += 2) {
      // Iterasi setiap pasangan pilihan dan nilai
      // choices.push({ choice: row[i], value: parseInt(row[i + 1], 10) });
      // choices.push({ choice: row[i] });
      if (i <= 1) {
        choices += ''; // Menambahkan garis pemisah setelah elemen pertama
      } else {
        choices += '|';
      }
      choices += `${row[i]}`;
    }
    choices = shuffleChoices(choices); // Acak pilihan
    return {
      type: '',
      text: question,
      name: '',
      options: choices,
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
  return choices;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  getQuestions: async (req, res, next) => {
    try {
      const dataSpreadSheets = await getQuestionsWithShuffledChoices(auth);
      // res.json({ questions: dataSpreadSheets });

      // Membuat Form Baru
      const createFormCommand = `curl -X POST -d "questions[0][type]=control_head" -d "questions[0][text]=Jawab pertanyaan berikut, disini tidak ada jawaban benar ataupun salah" -d "questions[0][order]=1" -d "questions[0][name]=Header" -d "questions[1][type]=control_textbox" -d "questions[1][text]=Nama Lengkap" -d "questions[1][order]=2" -d "questions[1][name]=TextBox" -d "questions[1][validation]=None" -d "questions[1][required]=Yes" -d "questions[1][readonly]=No" -d "questions[1][size]=20" -d "questions[1][labelAlign]=Auto" -d "questions[1][hint]= " -d "properties[title]=Test Pesikolog" -d "properties[height]=600" "https://api.jotform.com/form?apiKey=${process.env.JOTFORM_API}"`;

      const formID = await new Promise((resolve, reject) => {
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

      // Pertanyaan yang akan ditambahkan
      const questions = [
        {
          type: 'control_textbox',
          text: 'Jawab pertanyaan ini',
          name: 'clickTo',
        },
        {
          type: 'control_textbox',
          text: 'Nama Lengkap',
          name: 'TextBox',
        },
        {
          type: 'control_textarea',
          text: 'Describe yourself',
          name: 'TextArea',
        },
        {
          type: 'control_radio',
          text: 'Warna Favorit',
          name: 'favoriteColor',
          options: 'Red|Green|Blue|Yellow',
        },
      ];

      // Menambahkan Pertanyaan Satu per Satu
      let order = 3;
      for (const question of dataSpreadSheets) {
        const createQuestions = `curl -X POST -d "question[type]=control_radio" -d "question[text]=${question.text}" -d "question[order]=${order}" -d "question[name]=${order}" -d "question[required]=Yes" -d "question[options]=${
          question.options || ''
        }" "https://api.jotform.com/form/${formID}/questions?apiKey=${process.env.JOTFORM_API}"`;
        await new Promise((resolve, reject) => {
          exec(createQuestions, (error, stdout) => {
            if (error) {
              return reject(`Gagal membuat pertanyaan: ${error.message}`);
            }
            const response = JSON.parse(stdout);
            if (response.responseCode !== 200) {
              return reject(`Gagal membuat pertanyaan: ${response.message}`);
            }
            console.log('pertanyaannnn', response);
            resolve(response);
          });
        });
        order++;
      }

      console.log('Semua proses selesai.');
      res.send('Semua proses selesai.');
    } catch (err) {
      console.error(err);
    }
  },

  getAnswer: async (req, res, next) => {
    //   const forms = google.forms({ version: 'v1', auth: authForm });
    //   const formId = '14RK8BGZ05kW2WI9Kq5X1nfexB-DVGdTpPUra8IXKDH0'; // ID dari Google Form
    //   try {
    //     const response = await forms.forms.responses.list({
    //       formId,
    //     });

    //     const answers = response;
    //     console.log('Form Responses:', answers);
    //     res.json(answers);
    //   } catch (err) {
    //     console.error('Error fetching form responses:', err);
    //   }
    // },

    const answers = await getMappedResponses('14RK8BGZ05kW2WI9Kq5X1nfexB-DVGdTpPUra8IXKDH0');
    console.log('Form Responses:', answers);
    res.json(answers);
  },
};
