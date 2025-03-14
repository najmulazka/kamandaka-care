const router = require('express').Router();
const { googleOauth2, whoami, addAdmin, loginAdmin, loginDoctor, whoDoctor } = require('../controllers/auth.controllers');
const passport = require('../libs/passport.lib');
const { restrict, doctor } = require('../middlewares/restrict.middleware');
const { URL_BE } = process.env;

router.post('/add-admin', addAdmin);
router.post('/login-admin', loginAdmin);
router.post('/login-doctor', loginDoctor);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: URL_BE,
  }),
  googleOauth2
);

router.get('/whoami', restrict, whoami);
router.get('/who-doctor', doctor, whoDoctor);

module.exports = router;
