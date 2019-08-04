const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../models/User');

const { JWT_SECRET } = process.env;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      return done(null, user.getUser() || false);
    });
  })
);
