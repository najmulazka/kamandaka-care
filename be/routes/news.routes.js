const { admin } = require('../middlewares/restrict.middleware');
const router = require('express').Router();
const { image } = require('../libs/multer.libs');
const { createNews, getNewsDetail, getNews, updateNews, deleteNews } = require('../controllers/news.controllers');

router.post('/', image.single('image'), admin, createNews);
router.get('/:id', getNewsDetail);
router.get('/', getNews);
router.put('/:id', image.single('image'), admin, updateNews);
router.delete('/:id', admin, deleteNews);

module.exports = router;
