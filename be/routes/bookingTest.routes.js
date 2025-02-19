const { createBookingTest, validateBookingTest, getBookingTest, getBookingTests, getBookingTestClient, getBookingTestDoctor, updateResultTest, getAnswerTest } = require('../controllers/bookingTest.controllers');
const { pdf } = require('../libs/multer.libs');
const { restrict, doctor, admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.get('/client', restrict, getBookingTestClient);
router.get('/doctor', doctor, getBookingTestDoctor);
router.get('/answer/:id', doctor, getAnswerTest);
router.get('/:id', getBookingTest);
router.get('/', admin, getBookingTests);
router.post('/', restrict, createBookingTest);
router.put('/:id', admin, validateBookingTest);
router.put('/result/:id', pdf.single('result'), doctor, updateResultTest);

module.exports = router;
