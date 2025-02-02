const router = require('express').Router();
const test = require('./test.routes');
const auth = require('./auth.routes');

router.use('/auth', auth);
router.use('/test', test);

module.exports = router;
