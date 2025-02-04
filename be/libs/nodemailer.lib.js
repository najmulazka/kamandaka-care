const nodemailer = require('nodemailer');
const ejs = require('ejs');
const {  GOOGLE_SENDER_EMAIL, GOOGLE_PASS_EMAIL} = process.env;

module.exports = {
  sendEmail: async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GOOGLE_SENDER_EMAIL,
        pass: GOOGLE_PASS_EMAIL,
      },
    });

    await transporter.sendMail({
      from: GOOGLE_SENDER_EMAIL,
      to,
      subject,
      // text: "Hello world?dfgd", // plain text body
      html,
    });

    // console.log('Message sent: %s', info.messageId);
    // console.log('send mail success');
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  },

  getHtml: (fileName, data) => {
    return new Promise((resolve, reject) => {
      const path = `${__dirname}/../views/${fileName}`;

      ejs.renderFile(path, data, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
};