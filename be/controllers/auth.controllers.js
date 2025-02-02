const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const prisma = require('../libs/prisma.lib');
const bcrypt = require('bcrypt');

module.exports = {
  addAdmin: async (req, res, next) => {
    const { username, password } = req.body;

    const adminExist = await prisma.admin.findUnique({ where: { username } });
    if (adminExist) {
      res.sendResponse(400, 'Bad Request', 'Username already exist', null);
    }

    const encryptedPassword = bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        username,
        password: encryptedPassword,
      },
    });

    res.sendResponse(201, 'OK', null, admin);
  },

  loginAdmin: async (req, res, next) => {
    const { username, password } = req.body;

    const adminExist = await prisma.admin.findUnique({ where: { username } });
    if (!adminExist) {
      res.sendResponse(400, 'Bad request', 'Username or password wrong', null);
    }

    const passwordCorrect = bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      res.sendResponse(400, 'Bad request', 'Username or password wrong', null);
    }

    const token = jwt.sign({ id: adminExist.id }, JWT_SECRET_KEY);
    res.status(200).json({
      status: true,
      message: 'OK',
      data: { admin: adminExist, token },
    });
  },

  addDoctor: async (req, res, next) => {
    const { fullName, email, password, specialist } = req.body;

    const doctorExist = await prisma.admin.findUnique({ where: { email } });
    if (doctorExist) {
      res.sendResponse(400, 'Bad Request', 'Doctor already exist', null);
    }

    const encryptedPassword = bcrypt.hash(password, 10);
    const doctor = await prisma.admin.create({
      data: {
        fullName,
        email,
        password: encryptedPassword,
        specialist,
      },
    });

    res.sendResponse(201, 'OK', null, doctor);
  },

  loginDoctor: async (req, res, next) => {
    const { email, password } = req.body;

    const doctorExist = await prisma.admin.findUnique({ where: { email } });
    if (!doctorExist) {
      res.sendResponse(400, 'Bad request', 'Email or password wrong', null);
    }

    const passwordCorrect = bcrypt.compare(password, doctorExist.password);
    if (!passwordCorrect) {
      res.sendResponse(400, 'Bad request', 'Username or password wrong', null);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);
    res.status(200).json({
      status: true,
      message: 'OK',
      data: { doctor: doctorExist, token },
    });
  },

  googleOauth2: async (req, res, next) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET_KEY);

    res.status(200).json({
      status: true,
      message: 'OK',
      data: { user: req.user, token },
    });
  },

  whoami: async (req, res, next) => {
    res.status(200).json({
      status: true,
      message: 'OK',
      err: null,
      data: { user: req.client },
    });
  },
};
