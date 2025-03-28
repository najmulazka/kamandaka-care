const path = require('path');
const prisma = require('../libs/prisma.lib');
const imagekit = require('../libs/imagekit.libs');
const { getAnswerr } = require('../libs/answerr.libs');
const { sendEmail, getHtml } = require('../libs/nodemailer.lib');
const { formatTimeToWib } = require('../libs/formatTimeToWib.libs');
const { setAccessForm } = require('../libs/accessForm.libs');
const { GOOGLE_FORM_IST, GOOGLE_FORM_CFIT_2, GOOGLE_FORM_CFIT_3, GOOGLE_FORM_GAYA_BELAJAR, GOOGLE_FORM_KEPRIBADIAN, GOOGLE_FORM_MINAT, GOOGLE_FORM_GANGGUAN_PSIKOLOGI, GOOGLE_FORM_REKRUITMEN_PEKERJAAN } = process.env;

module.exports = {
  createBookingTest: async (req, res, next) => {
    try {
      const { testTypeId } = req.body;

      const bookingTest = await prisma.bookingTest.create({
        data: {
          clientId: req.client.id,
          testTypeId: Number(testTypeId),
        },
      });

      res.sendResponse(201, 'Created', null, bookingTest);
    } catch (err) {
      next(err);
    }
  },

  validateBookingTest: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { isValidate } = req.body;

      const bookingTestExist = await prisma.bookingTest.findUnique({ where: { id: Number(id) } });
      if (!bookingTestExist) return res.sendResponse(404, 'Not Found', 'Resource not found', null);

      const bookingTest = await prisma.bookingTest.update({
        where: { id: Number(id) },
        data: {
          isValidate,
        },
        include: {
          clients: true,
          testypes: {
            include: {
              doctors: {
                select: { fullName: true, email: true },
              },
            },
          },
        },
      });

      let questionUrl = '';
      let emailPromises = [];
      if (bookingTest.isValidate) {
        if (bookingTest.testypes.testName.toLowerCase().includes('belajar')) {
          questionUrl = GOOGLE_FORM_GAYA_BELAJAR;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('kepribadian')) {
          questionUrl = GOOGLE_FORM_KEPRIBADIAN;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('minat')) {
          questionUrl = GOOGLE_FORM_MINAT;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('psikologi')) {
          questionUrl = GOOGLE_FORM_GANGGUAN_PSIKOLOGI;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('pekerjaan')) {
          questionUrl = GOOGLE_FORM_REKRUITMEN_PEKERJAAN;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('ist')) {
          questionUrl = GOOGLE_FORM_IST;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('cfit 2')) {
          questionUrl = GOOGLE_FORM_CFIT_2;
        } else if (bookingTest.testypes.testName.toLowerCase().includes('cfit 3')) {
          questionUrl = GOOGLE_FORM_CFIT_3;
        }

        const a = await prisma.bookingTest.update({
          where: { id: Number(id) },
          data: {
            // questionUrl: `https://form.jotform.com/${questions.formId}`,
            questionUrl: questionUrl,
          },
          include: {
            clients: true,
            testypes: true,
          },
        });

        await setAccessForm(a.testypes.testName, a.clients.email);

        const [html, htmlDoctor] = await Promise.all([
          getHtml('booking-test-successfull.ejs', {
            client: {
              fullName: bookingTest.clients.fullName,
              testName: bookingTest.testypes.testName,
              questionUrl: a.questionUrl,
            },
          }),
          getHtml('get-booking-test.ejs', {
            doctor: {
              fullName: bookingTest.testypes.doctors.fullName,
              testName: bookingTest.testypes.testName,
              questionUrl: a.questionUrl,
            },
          }),
        ]);

        emailPromises.push(sendEmail(bookingTest.clients.email, bookingTest.testypes.testName, html), sendEmail(bookingTest.testypes.doctors.email, bookingTest.testypes.testName, htmlDoctor));
      } else {
        const html = await getHtml('booking-test-failed.ejs', {
          client: {
            fullName: bookingTest.clients.fullName,
            testName: bookingTest.testypes.testName,
          },
        });

        emailPromises.push(sendEmail(bookingTest.clients.email, 'Booking Test Psikologi Gagal', html));
      }

      await Promise.all(emailPromises);
      res.sendResponse(200, 'OK', null, bookingTest);
    } catch (err) {
      next(err);
    }
  },

  getBookingTests: async (req, res, next) => {
    try {
      let { date, month, year } = req.query;
      let where = {};

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
        where.createdAt = { gte: startDate, lt: endDate };
        where.isValidate = true;
      }

      const bookingTest = await prisma.bookingTest.findMany({
        where,
        include: {
          clients: true,
          testypes: {
            include: {
              educations: true,
              doctors: {
                select: { fullName: true, email: true },
              },
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });

      const bookingsWithWIB = bookingTest.map((booking) => ({
        ...booking,
        createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
      }));

      res.sendResponse(200, 'OK', null, bookingsWithWIB);
    } catch (err) {
      next(err);
    }
  },

  getBookingTest: async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookingTest = await prisma.bookingTest.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          clients: true,
          testypes: {
            include: {
              educations: true,
              doctors: {
                select: { fullName: true, email: true },
              },
            },
          },
        },
        orderBy: [{ id: 'desc' }],
      });

      if (!bookingTest) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      const bookingsWithWIB = bookingTest.map((booking) => ({
        ...booking,
        createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
      }));

      res.sendResponse(200, 'OK', null, bookingsWithWIB);
    } catch (err) {
      next(err);
    }
  },

  getBookingTestClient: async (req, res, next) => {
    try {
      const bookingTest = await prisma.bookingTest.findMany({
        where: {
          clientId: req.client.id,
        },
        include: {
          testypes: {
            include: {
              educations: true,
              doctors: {
                select: { fullName: true, email: true },
              },
            },
          },
        },
        orderBy: [{ id: 'desc' }],
      });

      const bookingsWithWIB = bookingTest.map((booking) => ({
        ...booking,
        createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
      }));
      res.sendResponse(200, 'OK', null, bookingsWithWIB);
    } catch (err) {
      next(err);
    }
  }, // update

  getBookingTestDoctor: async (req, res, next) => {
    try {
      const bookingTest = await prisma.bookingTest.findMany({
        where: {
          testypes: {
            doctors: { id: req.doctor.id },
          },
          isValidate: true,
        },
        include: {
          testypes: {
            include: {
              educations: true,
            },
          },
          clients: true,
        },
        orderBy: { id: 'desc' },
      });

      const bookingsWithWIB = bookingTest.map((booking) => ({
        ...booking,
        createdAt: formatTimeToWib('dddd, DD MMMM YYYY HH:mm:ss', booking.createdAt),
      }));

      res.sendResponse(200, 'OK', null, bookingsWithWIB);
    } catch (err) {
      next(err);
    }
  },

  getAnswerTest: async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookingTest = await prisma.bookingTest.findUnique({
        where: { id: Number(id) },
        include: {
          clients: true,
          testypes: {
            include: {
              doctors: {
                select: { fullName: true, email: true },
              },
            },
          },
        },
      });

      const answer = await getAnswerr(bookingTest.id, bookingTest.testypes.testName, bookingTest.clients.email);
      res.sendResponse(200, 'OK', null, { bookingTest, answer });
    } catch (err) {
      next(err);
    }
  },

  updateResultTest: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
      }

      let strFile = req.file.buffer.toString('base64');
      // let strFile = req.file.buffer;
      const [uploadResult, bookingTestExist] = await Promise.all([
        imagekit.upload({
          fileName: Date.now() + path.extname(req.file.originalname),
          file: strFile,
        }),
        prisma.bookingTest.findUnique({ where: { id: Number(id) } }),
      ]);

      const deleteOldFile = bookingTestExist.fileId ? imagekit.deleteFile(bookingTestExist.fileId) : Promise.resolve();

      const [bookingTest] = await Promise.all([
        prisma.bookingTest.update({
          where: { id: Number(id) },
          data: {
            resultUrl: uploadResult.url,
            fileId: uploadResult.fileId,
          },
          include: { clients: true, testypes: true },
        }),
        deleteOldFile,
      ]);

      const html = await getHtml('result-test.ejs', {
        client: {
          fullName: bookingTest.clients.fullName,
          testName: bookingTest.testypes.testName,
          resultUrl: bookingTest.resultUrl,
        },
      });

      await sendEmail(bookingTest.clients.email, `Hasil tes ${bookingTest.testypes.testName}`, html);
      res.sendResponse(200, 'OK', null, bookingTest);
    } catch (err) {
      next(err);
    }
  },

  autoInvalidBookingTest: async () => {
    try {
      const timeNow = new Date();
      timeNow.setUTCHours(timeNow.getUTCHours() - 3);

      await prisma.bookingTest.updateMany({
        where: {
          isValidate: null,
          createdAt: { lt: timeNow },
        },
        data: {
          isValidate: false,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
