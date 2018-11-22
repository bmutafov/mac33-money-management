const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy({
    clientID: keys.facebook.id,
    clientSecret: keys.facebook.secret,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'email', 'name', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    let existingUser = await User.findOne({ fbId: profile.id })
    if (existingUser) {
      done(null, existingUser);
    } else {
      let newUser = await new User({
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        color: 0,
        fbId: profile.id,
        picture: profile.photos[0].value,
      }).save();
      done(null, newUser);
    }
  })
);