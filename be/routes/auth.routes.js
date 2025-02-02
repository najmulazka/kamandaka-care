const router = require('express').Router();
const { googleOauth2, whoami } = require('../controllers/auth.controllers');
const passport = require('../libs/passport.lib');
const { restrict } = require('../middlewares/restrict.middleware');

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
