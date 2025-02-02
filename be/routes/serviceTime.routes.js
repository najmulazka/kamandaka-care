const { getServiceTimes, updateServiceTime } = require('../controllers/serviceTime.controllers');

const router = require('express').Router();

router.get('/', getServiceTimes);
router.put('/:id', updateServiceTime);

module.exports = router;
