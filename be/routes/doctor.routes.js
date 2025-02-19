const { createDoctor, getDoctors, updateDoctors, deleteDoctors } = require('../controllers/doctor.controllers');
const { admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/', admin, createDoctor);
router.get('/', getDoctors);
router.put('/:id', admin, updateDoctors);
router.delete('/:id', admin, deleteDoctors);

module.exports = router;
