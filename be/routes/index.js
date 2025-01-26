const router = require('express').Router();
const test = require('./test.routes');

router.use('/test', test);

module.exports = router;
