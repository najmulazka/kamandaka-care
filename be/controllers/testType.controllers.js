const prisma = require('../libs/prisma.lib');

module.exports = {
  createTestType: async (req, res, next) => {
    try {
      const { educationId, doctorId, testName, description, price } = req.body;

      const testType = await prisma.testTypes.create({
        data: {
          educationId: Number(educationId),
          doctorId: Number(doctorId),
          testName,
          description,
          price,
        },
      });
      if (!testType) return res.sendResponse(400, 'Bad request', 'Failed to add data', null);

      res.sendResponse(201, 'Created', null, testType);
    } catch (err) {
      next(err);
    }
  },

  getTestTypes: async (req, res, next) => {
    try {
      const testType = await prisma.testTypes.findMany({
        include: {
          educations: true,
          doctors: { select: { fullName: true } },
        },
      });

      res.sendResponse(200, 'OK', null, testType);
    } catch (err) {
      next(err);
    }
  },

  updateTestType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { educationId, doctorId, testName, description, price } = req.body;

      const testTypeExist = await prisma.testTypes.findUnique({ where: { id: Number(id) } });
      if (!testTypeExist) return res.sendResponse(404, 'Not Found', 'Resource not found', null);

      const testType = await prisma.testTypes.update({
        where: { id: Number(id) },
        data: { educationId: Number(educationId), doctorId: Number(doctorId), testName, description, price },
      });
      if (!testType) return res.sendResponse(400, 'Bad request', 'Failed to update data', null);

      res.sendResponse(200, 'OK', null, testType);
    } catch (err) {
      next(err);
    }
  },

  deleteTestType: async (req, res, next) => {
    try {
      const { id } = req.params;

      const testTypeExist = await prisma.testTypes.findUnique({ where: { id: Number(id) } });
      if (!testTypeExist) return res.sendResponse(404, 'Not Found', 'Resource not found', null);

      await prisma.testTypes.delete({ where: { id: Number(id) } });
      res.sendResponse(200, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
