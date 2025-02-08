const { createDoctor, getDoctors } = require('../controllers/doctor.controllers');

const router = require('express').Router();

router.post('/', createDoctor);
router.get('/', getDoctors);

module.exports = router;
