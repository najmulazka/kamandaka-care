const router = require('express').Router();
const test = require('./test.routes');
const auth = require('./auth.routes');
const service = require('./service.routes');
const serviceTime = require('./serviceTime.routes');
const booking = require('./booking.routes');

router.use('/auth', auth);
router.use('/test', test);
router.use('/service', service);
router.use('/service-time', serviceTime);
router.use('/booking', booking);

module.exports = router;
