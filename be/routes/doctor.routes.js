const { createDoctor, getDoctors, updateDoctors, deleteDoctors } = require('../controllers/doctor.controllers');

const router = require('express').Router();

router.post('/', createDoctor);
router.get('/', getDoctors);
router.put('/:id', updateDoctors);
router.delete('/:id', deleteDoctors);

module.exports = router;
