const { scheedule, createBookingOffline, createBooking, validateBooking, getBookings, getBookingsDoctor, getBookingsClient } = require('../controllers/booking.controllers');
const { restrict, doctor, admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/scheedule', scheedule);
router.post('/offline', admin, createBookingOffline);
router.post('/', restrict, createBooking);
router.put('/:id', admin, validateBooking);
router.get('/client', restrict, getBookingsClient);
router.get('/doctor', doctor, getBookingsDoctor);
router.get('/', admin, getBookings);

module.exports = router;
