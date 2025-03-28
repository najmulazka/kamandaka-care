const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../libs/prisma.lib');
const { JWT_SECRET_KEY, URL } = process.env;

module.exports = {
  addAdmin: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const adminExist = await prisma.admin.findUnique({ where: { username } });
      if (adminExist) {
        res.sendResponse(400, 'Bad Request', 'Username already exist', null);
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const admin = await prisma.admin.create({
        data: {
          username,
          password: encryptedPassword,
        },
      });

      res.sendResponse(201, 'OK', null, admin);
    } catch (err) {
      next(err);
    }
  },

  loginAdmin: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const adminExist = await prisma.admin.findUnique({ where: { username } });
      if (!adminExist) {
        return res.sendResponse(400, 'Bad request', 'Username or password wrong', null);
      }

      const passwordCorrect = await bcrypt.compare(password, adminExist.password);
      if (!passwordCorrect) {
        return res.sendResponse(400, 'Bad request', 'Username or password wrong', null);
      }

      const token = jwt.sign({ id: adminExist.id }, JWT_SECRET_KEY);
      res.status(200).json({
        status: true,
        message: 'OK',
        data: { admin: adminExist, token },
      });
    } catch (err) {
      next(err);
    }
  },

  loginDoctor: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const doctorExist = await prisma.doctors.findUnique({ where: { email } });
      if (!doctorExist) {
        return res.sendResponse(400, 'Bad request', 'Email or password wrong', null);
      }

      const passwordCorrect = await bcrypt.compare(password, doctorExist.password);
      if (!passwordCorrect) {
        return res.sendResponse(400, 'Bad request', 'Username or password wrong', null);
      }

      const token = jwt.sign({ id: doctorExist.id }, JWT_SECRET_KEY);
      res.status(200).json({
        status: true,
        message: 'OK',
        data: { doctor: doctorExist, token },
      });
    } catch (err) {
      next(err);
    }
  },

  googleOauth2: async (req, res, next) => {
    try {
      const token = jwt.sign({ id: req.user.id }, JWT_SECRET_KEY);

      const redirectUrl = `${URL}/callback?token=${token}`;
      res.redirect(redirectUrl);
    } catch (err) {
      next(err);
    }
  },

  whoami: async (req, res, next) => {
    try {
      res.status(200).json({
        status: true,
        message: 'OK',
        err: null,
        data: { user: req.client },
      });
    } catch (err) {
      next(err);
    }
  },

  whoDoctor: async (req, res, next) => {
    try {
      res.status(200).json({
        status: true,
        message: 'OK',
        err: null,
        data: { user: req.doctor },
      });
    } catch (err) {
      next(err);
    }
  },
};
