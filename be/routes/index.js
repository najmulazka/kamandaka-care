const router = require('express').Router();
const doctor = require('./doctor.routes');
const test = require('./test.routes');
const auth = require('./auth.routes');
const service = require('./service.routes');
const serviceTime = require('./serviceTime.routes');
const booking = require('./booking.routes');
const education = require('./education.routes');
const testType = require('./testType.routes');
const bookingTest = require('./bookingTest.routes');
const { getAnswerr } = require('../libs/answerr.libs');

router.use('/auth', auth);
router.use('/doctor', doctor);
router.use('/test', test);
router.use('/service', service);
router.use('/service-time', serviceTime);
router.use('/booking', booking);
router.use('/education', education);
router.use('/test-type', testType);
router.use('/booking-test', bookingTest);
router.get('/answerr', getAnswerr);

module.exports = router;
