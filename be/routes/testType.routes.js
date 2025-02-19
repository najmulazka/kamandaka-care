const { createTestType, getTestTypes, updateTestType, deleteTestType } = require('../controllers/testType.controllers');
const { admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/', admin, createTestType);
router.get('/', getTestTypes);
router.put('/:id', admin, updateTestType);
router.delete('/:id', admin, deleteTestType);

module.exports = router;
