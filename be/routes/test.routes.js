const { getQuestions, getAnswer } = require('../controllers/test.controllers');
const router = require('express').Router();

router.get('/', getQuestions);
router.get('/answer', getAnswer);

module.exports = router;
