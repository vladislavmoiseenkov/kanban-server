const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const env = require('node-env-file');
const cors = require('cors');
const morgan = require('morgan');

if (process.argv.indexOf('--dev') !== -1) {
  // eslint-disable-next-line
  env(__dirname + '/.env');
}

const {
  PORT,
} = process.env;

require('./libs/mongoose');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
middlewares.forEach(m => require(`./middlewares/${m}`).init(app));

require('./routes')(app);


app.listen(PORT, () => {
  console.log('Server Start!');
});
