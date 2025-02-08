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
      await prisma.bookingTest.update({
        where: { id: Number(id) },
        data: {
          questionUrl: `https://form.jotform.com/${questions.formId}`,
        },
      });

      sendEmail(bookingTest.clients.email, bookingTest.testypes.testName, `<b>https://form.jotform.com/${questions}</>`);

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

    const answer = getAnswer(formId);
    res.sendResponse(200, 'OK', null, { bookingTest, answers: answer.answers });
  },

  getBookingTestsClient: async (req, res, next) => {
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

  getBookingTestsDoctor: async (req, res, next) => {
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
};
