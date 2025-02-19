const { createEducation, getEducations, updateEducation, deleteEducation } = require('../controllers/education.controllers');
const { admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/', admin, createEducation);
router.get('/', getEducations);
router.put('/:id', admin, updateEducation);
router.delete('/:id', admin, deleteEducation);

module.exports = router;
