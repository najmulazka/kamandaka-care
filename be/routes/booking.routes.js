const { scheedule, createBooking, validateBooking, getBookings, getBookingDoctors } = require('../controllers/booking.controllers');
const { restrict, doctor } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/scheedule', scheedule);
router.post('/', restrict, createBooking);
router.put('/:id', validateBooking);
router.get('/', getBookings);
router.get('/doctor', doctor, getBookingDoctors);

module.exports = router;
