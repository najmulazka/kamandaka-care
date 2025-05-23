const prisma = require('../libs/prisma.lib');

module.exports = {
  createEducation: async (req, res, next) => {
    try {
      const { educationLevel } = req.body;

      const educationExist = await prisma.educations.findUnique({ where: { educationLevel } });
      if (educationExist) return res.sendResponse(400, 'Bad request', 'Education name already exist', null);

      const education = await prisma.educations.create({
        data: {
          educationLevel,
        },
      });
      if (!education) return res.sendResponse(400, 'Bad request', 'Failed to add data', null);

      res.sendResponse(201, 'Created', null, education);
    } catch (err) {
      next(err);
    }
  },

  getEducations: async (req, res, next) => {
    try {
      const education = await prisma.educations.findMany({ include: { TestType: true } });

      res.sendResponse(200, 'OK', null, education);
    } catch (err) {
      next(err);
    }
  },

  updateEducation: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { educationLevel } = req.body;

      const educationExist = await prisma.educations.findUnique({ where: { id: Number(id) } });
      if (!educationExist) return res.sendResponse(404, 'Not Found', 'Resource not found', null);

      const education = await prisma.educations.update({
        where: { id: Number(id) },
        data: { educationLevel },
      });
      if (!education) return res.sendResponse(400, 'Bad request', 'Failed to update data', null);

      res.sendResponse(200, 'OK', null, education);
    } catch (err) {
      next(err);
    }
  },

  deleteEducation: async (req, res, next) => {
    try {
      const { id } = req.params;

      const educationExist = await prisma.educations.findUnique({ where: { id: Number(id) } });
      if (!educationExist) return res.sendResponse(404, 'Not Found', 'Resource not found', null);

      await prisma.educations.delete({ where: { id: Number(id) } });
      res.sendResponse(200, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
