
module.exports = app => {
  app.use('/app', require('./privateRoutes'));
  app.use(require('./publicRoutes'));
};
