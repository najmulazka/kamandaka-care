const prisma = require('../libs/prisma.lib');

module.exports = {
  createService: async (req, res, next) => {
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
  },

  getServices: async (req, res, next) => {
    const services = await prisma.services.findMany();

    res.sendResponse(200, 'OK', null, services);
  },

  getService: async (req, res, next) => {
    const { id } = req.params;

    const serviceExist = await prisma.services.findUnique({ where: { id: Number(id) } });
    if (!serviceExist) return res.sendResponse(400, 'Bad request', 'Service does not exist', null);

    res.sendResponse(200, 'OK', null, serviceExist);
  },

  updateService: async (req, res, next) => {
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
  },

  deleteService: async (req, res, next) => {
    const { id } = req.params;

    const serviceExist = await prisma.services.findUnique({ where: { id: Number(id) } });
    if (!serviceExist) return res.sendResponse(400, 'Bad request', 'Service does not exist', null);

    await prisma.services.delete({ where: { id: Number(id) } });
    res.sendResponse(200, 'Deleted', null, null);
  },
};
