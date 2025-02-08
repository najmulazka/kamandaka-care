const router = require('express').Router();
const { googleOauth2, whoami, addAdmin, loginAdmin, loginDoctor } = require('../controllers/auth.controllers');
const passport = require('../libs/passport.lib');
const { restrict } = require('../middlewares/restrict.middleware');

router.post('/add-admin', addAdmin);
router.post('/login-admin', loginAdmin);
router.post('/login-doctor', loginDoctor);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `http://localhost:3000`,
  }),
  googleOauth2
);

router.get('/whoami', restrict, whoami);

module.exports = router;
