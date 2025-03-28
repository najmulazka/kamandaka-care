const prisma = require('../libs/prisma.lib');

module.exports = {
  createService: async (req, res, next) => {
    try {
      const { doctorId, serviceName, price } = req.body;

      const serviceExist = await prisma.services.findUnique({ where: { serviceName } });
      if (serviceExist) return res.sendResponse(400, 'Bad request', 'Service name already exist', null);

      const service = await prisma.services.create({
        data: {
          doctorId: Number(doctorId),
          serviceName,
          price,
        },
      });
      if (!service) return res.sendResponse(400, 'Bad request', err.message, null);

      await prisma.serviceTime.create({
        data: {
          servicesId: Number(service.id),
        },
      });

      res.sendResponse(201, 'Created', null, service);
    } catch (err) {
      next(err);
    }
  },

  getServices: async (req, res, next) => {
    try {
      const services = await prisma.services.findMany({
        include: {
          doctors: {
            select: { email: true, fullName: true },
          },
        },
      });

      res.sendResponse(200, 'OK', null, services);
    } catch (err) {
      next(err);
    }
  },

  getService: async (req, res, next) => {
    try {
      const { id } = req.params;

      const serviceExist = await prisma.services.findUnique({ where: { id: Number(id) } });
      if (!serviceExist) return res.sendResponse(400, 'Bad request', 'Service does not exist', null);

      res.sendResponse(200, 'OK', null, serviceExist);
    } catch (err) {
      next(err);
    }
  },

  updateService: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { doctorId, serviceName, price } = req.body;

      const serviceExist = await prisma.services.findUnique({ where: { id: Number(id) } });
      if (!serviceExist) return res.sendResponse(400, 'Bad request', 'Service does not exist', null);

      const service = await prisma.services.update({
        where: { id: Number(id) },
        data: { doctorId: Number(doctorId), serviceName, price },
      });
      if (!service) return res.sendResponse(400, 'Bad request', 'error', null);

      res.sendResponse(200, 'OK', null, service);
    } catch (err) {
      next(err);
    }
  },

  deleteService: async (req, res, next) => {
    try {
      const { id } = req.params;

      const serviceExist = await prisma.services.findUnique({ where: { id: Number(id) } });
      if (!serviceExist) return res.sendResponse(400, 'Bad request', 'Service does not exist', null);

      await prisma.services.delete({ where: { id: Number(id) } });
      res.sendResponse(200, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
