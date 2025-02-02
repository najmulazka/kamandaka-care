const { booking, scheedule } = require('../controllers/booking.controllers');

const router = require('express').Router();

router.get('/scheedule', scheedule);
router.get('/', booking);

module.exports = router;
