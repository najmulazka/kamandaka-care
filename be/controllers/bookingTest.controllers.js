const imagekit = require('../libs/imagekit.libs');
const path = require('path');
const { sendEmail, getHtml } = require('../libs/nodemailer.lib');
const prisma = require('../libs/prisma.lib');
const { createQuestion, getAnswer } = require('../libs/test.lib');
const { getAnswerr } = require('../libs/answerr.libs');
const { GOOGLE_FORM_INTELIGENSI, GOOGLE_FORM_GAYA_BELAJAR, GOOGLE_FORM_KEPRIBADIAN, GOOGLE_FORM_MINAT, GOOGLE_FORM_GANGGUAN_PSIKOLOGI, GOOGLE_FORM_REKRUITMEN_PEKERJAAN } = process.env;

module.exports = {
  createBookingTest: async (req, res, next) => {
    const { testTypeId } = req.body;

    const bookingTest = await prisma.bookingTest.create({
      data: {
        clientId: req.client.id,
        testTypeId: Number(testTypeId),
      },
    });

    res.sendResponse(201, 'Created', null, bookingTest);
  },

  validateBookingTest: async (req, res, next) => {
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
    if (bookingTest.isValidate) {
      // const questions = await createQuestion(bookingTest.testypes.testName);
      if (bookingTest.testypes.testName.toLowerCase().includes('inteligensi')) {
        questionUrl = GOOGLE_FORM_INTELIGENSI;
      } else if (bookingTest.testypes.testName.toLowerCase().includes('belajar')) {
        questionUrl = GOOGLE_FORM_GAYA_BELAJAR;
      } else if (bookingTest.testypes.testName.toLowerCase().includes('kepribadian')) {
        questionUrl = GOOGLE_FORM_KEPRIBADIAN;
      } else if (bookingTest.testypes.testName.toLowerCase().includes('minat')) {
        questionUrl = GOOGLE_FORM_MINAT;
      } else if (bookingTest.testypes.testName.toLowerCase().includes('psikologi')) {
        questionUrl = GOOGLE_FORM_GANGGUAN_PSIKOLOGI;
      } else if (bookingTest.testypes.testName.toLowerCase().includes('pekerjaan')) {
        questionUrl = GOOGLE_FORM_REKRUITMEN_PEKERJAAN;
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

      const html = await getHtml('booking-test-successfull.ejs', {
        client: {
          fullName: bookingTest.clients.fullName,
          testName: bookingTest.testypes.testName,
          questionUrl: a.questionUrl,
        },
      });

      const htmlDoctor = await getHtml('get-booking-test.ejs', {
        doctor: {
          fullName: bookingTest.testypes.doctors.fullName,
          testName: bookingTest.testypes.testName,
          questionUrl: a.questionUrl,
        },
      });
      await sendEmail(bookingTest.clients.email, bookingTest.testypes.testName, html);
      await sendEmail(bookingTest.testypes.doctors.email, bookingTest.testypes.testName, htmlDoctor);

      return res.sendResponse(200, 'OK', null, a);
    }

    if (!bookingTest.isValidate) {
      const html = await getHtml('booking-test-failed.ejs', {
        client: {
          fullName: bookingTest.clients.fullName,
          testName: bookingTest.testypes.testName,
        },
      });

      await sendEmail(bookingTest.clients.email, 'Booking Test Psikologi Gagal', html);
      return res.sendResponse(200, 'OK', null, bookingTest);
    }

    res.sendResponse(200, 'OK', null, bookingTest);
  },

  getBookingTests: async (req, res, next) => {
    const bookingTest = await prisma.bookingTest.findMany({
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
    res.sendResponse(200, 'OK', null, bookingTest);
  },

  getBookingTest: async (req, res, next) => {
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
    });

    if (!bookingTest) {
      return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
    }

    // const formId = bookingTest.questionUrl.split('/')[3];

    // const answer = await getAnswer(formId);
    // res.sendResponse(200, 'OK', null, { bookingTest, answers: answer.answers[0].answers });
    res.sendResponse(200, 'OK', null, { bookingTest });
  },

  getBookingTestClient: async (req, res, next) => {
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
    });
    res.sendResponse(200, 'OK', null, bookingTest);
  },

  getBookingTestDoctor: async (req, res, next) => {
    const bookingTest = await prisma.bookingTest.findMany({
      where: {
        testypes: {
          doctors: { id: req.doctor.id },
        },
      },
      include: {
        testypes: {
          include: {
            educations: true,
          },
        },
        clients: true,
      },
    });

    res.sendResponse(200, 'OK', null, bookingTest);
  },

  getAnswerTest: async (req, res, next) => {
    try {
      // const { formId } = req.params;
      // const answer = await getAnswer(formId);
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

      const answer = await getAnswerr(bookingTest.testypes.testName, bookingTest.clients.email);

      // if (answer.answers.length === 0) {
      //   return res.sendResponse(200, 'OK', null, answer.answers);
      // }

      // res.sendResponse(200, 'OK', null, answer.answers[0].answers);
      res.sendResponse(200, 'OK', null, answer);
    } catch (err) {
      next(err);
    }
  },

  updateResultTest: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
      }

      let strFile = req.file.buffer.toString('base64');
      const { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const bookingTestExist = await prisma.bookingTest.findUnique({
        where: { id: Number(id) },
      });

      if (bookingTestExist.fileId !== null) {
        imagekit.deleteFile(bookingTestExist.fileId);
      }

      const bookingTest = await prisma.bookingTest.update({
        where: { id: Number(id) },
        data: {
          resultUrl: url,
          fileId,
        },
        include: { clients: true, testypes: true },
      });

      await sendEmail(bookingTest.clients.email, `Hasil tes ${bookingTest.testypes.testName}`, bookingTest.resultUrl);
      res.sendResponse(200, 'OK', null, bookingTest);
    } catch (err) {
      next(err);
    }
  },
};
