const prisma = require('../libs/prisma.lib');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  restrict: (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        err: 'Missing Authorizaion on header',
        data: null,
      });
    }

    jwt.verify(authorization, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorization',
          err: err.message,
          data: null,
        });
      }

      req.client = await prisma.clients.findUnique({ where: { id: decoded.id } });

      next(err);
    });
  },
  
  doctor: (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        err: 'Missing Authorizaion on header',
        data: null,
      });
    }

    jwt.verify(authorization, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorization',
          err: err.message,
          data: null,
        });
      }

      req.doctor = await prisma.doctors.findUnique({ where: { id: decoded.id } });

      next(err);
    });
  },
  
  admin: (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        err: 'Missing Authorizaion on header',
        data: null,
      });
    }

    jwt.verify(authorization, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorization',
          err: err.message,
          data: null,
        });
      }

      req.admin = await prisma.admin.findUnique({ where: { id: decoded.id } });

      next(err);
    });
  },
};
