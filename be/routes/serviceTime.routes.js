const { getServiceTimes, updateServiceTime } = require('../controllers/serviceTime.controllers');
const { doctor } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.get('/', doctor, getServiceTimes);
router.put('/:id', doctor, updateServiceTime);

module.exports = router;
