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

    res.sendResponse(201, 'OK', null, doctor);
  },
};
