const router = require('express').Router();
const passport = require('passport');


router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logout');
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email'],
}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.send('redirected');
})

module.exports = router;
