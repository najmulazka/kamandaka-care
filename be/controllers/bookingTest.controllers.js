const imagekit = require('../libs/imagekit.libs');
const path = require('path');
const { sendEmail } = require('../libs/nodemailer.lib');
const prisma = require('../libs/prisma.lib');
const { createQuestion, getAnswer } = require('../libs/test.lib');

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

    if (bookingTest.isValidate) {
      const questions = await createQuestion();
      const a = await prisma.bookingTest.update({
        where: { id: Number(id) },
        data: {
          questionUrl: `https://form.jotform.com/${questions.formId}`,
        },
      });

      sendEmail(bookingTest.clients.email, bookingTest.testypes.testName, `<b>https://form.jotform.com/${questions.formId}</>`);

      return res.sendResponse(200, 'OK', null, a);
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

    const formId = bookingTest.questionUrl.split('/')[3];

    const answer = await getAnswer(formId);
    res.sendResponse(200, 'OK', null, { bookingTest, answers: answer.answers[0].answers });
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
      const { formId } = req.params;
      const answer = await getAnswer(formId);

      if (answer.answers.length === 0) {
        return res.sendResponse(200, 'OK', null, answer.answers);
      }

      res.sendResponse(200, 'OK', null, answer.answers[0].answers);
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
