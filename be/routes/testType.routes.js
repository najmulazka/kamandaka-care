const { createTestType, getTestTypes, updateTestType, deleteTestType } = require('../controllers/testType.controllers');

const router = require('express').Router();

router.post('/', createTestType);
router.get('/', getTestTypes);
router.put('/:id', updateTestType);
router.delete('/:id', deleteTestType);

module.exports = router;
