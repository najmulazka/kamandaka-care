const { createBookingTest, validateBookingTest, getBookingTest, getBookingTests, getBookingTestClient, getBookingTestDoctor, updateResultTest, getAnswerTest } = require('../controllers/bookingTest.controllers');
const { pdf } = require('../libs/multer.libs');
const { restrict, doctor } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.get('/client', restrict, getBookingTestClient);
router.get('/doctor', doctor, getBookingTestDoctor);
router.get('/answer/:formId', getAnswerTest);
router.get('/:id', getBookingTest);
router.get('/', getBookingTests);
router.post('/', restrict, createBookingTest);
router.put('/:id', validateBookingTest);
router.put('/result/:id', pdf.single('result'), updateResultTest);

module.exports = router;
