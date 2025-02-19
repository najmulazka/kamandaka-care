const { createService, getServices, getService, updateService, deleteService } = require('../controllers/services.controllers');
const { admin } = require('../middlewares/restrict.middleware');

const router = require('express').Router();

router.post('/', admin, createService);
router.get('/', getServices);
router.get('/:id', getService);
router.put('/:id', admin, updateService);
router.delete('/:id', admin, deleteService);

module.exports = router;
