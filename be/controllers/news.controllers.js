const imagekit = require('../libs/imagekit.libs');
const prisma = require('../libs/prisma.lib');
const path = require('path');

module.exports = {
  createNews: async (req, res, next) => {
    const { title, description } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
      }

      let strFile = req.file.buffer.toString('base64');
      const { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const news = await prisma.news.create({
        data: {
          title,
          imageUrl: url,
          fileId,
          description,
        },
      });

      res.sendResponse(200, 'OK', null, news);
    } catch (err) {
      next(err);
    }
  },

  getNews: async (req, res, next) => {
    try {
      const news = await prisma.news.findMany();

      res.sendResponse(200, 'OK', null, news);
    } catch (err) {
      next(err);
    }
  },

  getNewsDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({ where: { id: Number(id) } });
      if (!news) {
        return res.sendResponse(404, 'Not Found', 'Return Not Found', null);
      }

      res.sendResponse(200, 'OK', null, news);
    } catch (err) {
      next(err);
    }
  },

  updateNews: async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
      }

      let strFile = req.file.buffer.toString('base64');
      const [uploadNews, newsExist] = await Promise.all([
        imagekit.upload({
          fileName: Date.now() + path.extname(req.file.originalname),
          file: strFile,
        }),
        ,
        prisma.news.findUnique({ where: { id: Number(id) } }),
      ]);

      if (!newsExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }
      await imagekit.deleteFile(newsExist.fileId);

      const news = await prisma.news.update({
        where: { id: Number(id) },
        data: {
          title,
          imageUrl: uploadNews.url,
          fileId: uploadNews.fileId,
          description,
        },
      });

      res.sendResponse(200, 'OK', null, news);
    } catch (err) {
      next(err);
    }
  },

  deleteNews: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newsExist = await prisma.news.findUnique({ where: { id: Number(id) } });
      if (!newsExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      await Promise.all([imagekit.deleteFile(newsExist.fileId), prisma.news.delete({ where: { id: Number(id) } })]);
      res.sendResponse(200, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
