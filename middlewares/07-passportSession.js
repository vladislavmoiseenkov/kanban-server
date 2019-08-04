const passport = require('../libs/passport');

module.exports.init = app => app.use(passport.session());
