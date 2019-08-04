const passport = require('passport');
const User = require('../../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => await User.findById(id, done));
