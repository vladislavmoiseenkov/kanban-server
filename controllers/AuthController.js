const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { JWT_SECRET } = process.env;

const jwtSingUser = user => {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
};

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(403).send({ error: 'The login information was incorrect' })
      }

      const isPasswordValid = user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(422).send({
          message: 'Unprocessable Entity',
        });
      }

      const userData= user.getUser();
      return res.send({
        user: userData,
        token: jwtSingUser(userData),
      });

    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  },
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userData = user.getUser();

      return res.send({
        user: userData,
        token: jwtSingUser(userData),
      });
    } catch (e) {
      console.error('register controller', e);
      return res.status(500).send(e);
    }
  },
  logout(req, res) {
    try {
      req.logout();
      return res.send();
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  },
  auth(req, res) {
    try {
      const { user } = req;
      return res.send({
        user,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  }
};
