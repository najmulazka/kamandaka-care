const { scheedule, createBooking, validateBooking } = require('../controllers/booking.controllers');
const { restrict } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/scheedule', scheedule);
router.post('/', restrict, createBooking);
router.put('/:id', validateBooking);

module.exports = router;
