const { createService, getServices, getService, updateService, deleteService } = require('../controllers/services.controllers');

const router = require('express').Router();

router.post('/', createService);
router.get('/', getServices);
router.get('/:id', getService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
