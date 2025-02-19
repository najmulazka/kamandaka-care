const { scheedule, createBooking, validateBooking, getBookings, getBookingsDoctor, getBookingsClient } = require('../controllers/booking.controllers');
const { restrict, doctor, admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/scheedule', restrict, scheedule);
router.post('/', restrict, createBooking);
router.put('/:id', admin, validateBooking);
router.get('/', admin, getBookings);
router.get('/client', restrict, getBookingsClient);
router.get('/doctor', doctor, getBookingsDoctor);

module.exports = router;
