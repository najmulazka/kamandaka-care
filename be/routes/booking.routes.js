const { scheedule, createBooking, validateBooking, getBookings, getBookingsDoctor, getBookingsClient } = require('../controllers/booking.controllers');
const { restrict, doctor } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/scheedule', scheedule);
router.post('/', restrict, createBooking);
router.put('/:id', validateBooking);
router.get('/', getBookings);
router.get('/client', restrict, getBookingsClient);
router.get('/doctor', doctor, getBookingsDoctor);

module.exports = router;
