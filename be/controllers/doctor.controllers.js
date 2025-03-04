const prisma = require('../libs/prisma.lib');
const bcrypt = require('bcrypt');

module.exports = {
  createDoctor: async (req, res, next) => {
    const { fullName, email, password, specialist } = req.body;

    const doctorExist = await prisma.doctors.findUnique({ where: { email } });
    if (doctorExist) {
      return res.sendResponse(400, 'Bad Request', 'Doctor already exist', null);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const doctor = await prisma.doctors.create({
      data: {
        fullName,
        email,
        password: encryptedPassword,
        specialist,
      },
    });

    res.sendResponse(201, 'OK', null, doctor);
  },

  getDoctors: async (req, res, next) => {
    const doctor = await prisma.doctors.findMany();

    res.sendResponse(200, 'OK', null, doctor);
  },

  updateDoctors: async (req, res, next) => {
    const { id } = req.params;
    const { fullName, email, password, specialist } = req.body;
    const doctorExist = await prisma.doctors.findUnique({ where: { id: Number(id) } });
    if (!doctorExist) {
      return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const doctor = await prisma.doctors.update({
      where: { id: Number(id) },
      data: {
        fullName,
        email,
        password: encryptedPassword,
        specialist,
      },
    });

    res.sendResponse(200, 'OK', null, doctor);
  },

  deleteDoctors: async (req, res, next) => {
    const { id } = req.params;
    const doctorExist = await prisma.doctors.findUnique({ where: { id: Number(id) } });
    if (!doctorExist) {
      return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
    }

    await prisma.doctors.delete({ where: { id: Number(id) } });

    res.sendResponse(200, 'Deleted', null, null);
  },
};
