const express = require('express');

const router = express.Router();

const { login, register } = require('../controllers/AuthController');

router.get('/', (req, res) => {
  return res.send('Hello world!');
});

router.post('/login', login);
router.post('/register', register);

module.exports = router;
