const { createBookingTest, validateBookingTest, getBookingTests, getBookingTest, getBookingTestsClient, getBookingTestsDoctor } = require('../controllers/bookingTest.controllers');
const { restrict, doctor } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/', restrict, createBookingTest);
router.put('/:id', validateBookingTest);
router.get('/client', restrict, getBookingTestsClient);
router.get('/doctor', doctor, getBookingTestsDoctor);
router.get('/:id', getBookingTest);
router.get('/', getBookingTests);

module.exports = router;
