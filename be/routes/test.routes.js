const { createQuestion, getAnswer } = require('../controllers/test.controllers');
const router = require('express').Router();

router.get('/', createQuestion);
router.get('/answer', getAnswer);

module.exports = router;
