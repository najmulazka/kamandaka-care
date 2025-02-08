const { createEducation, getEducations, updateEducation, deleteEducation } = require('../controllers/education.controllers');

const router = require('express').Router();

router.post('/', createEducation);
router.get('/', getEducations);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);

module.exports = router;
