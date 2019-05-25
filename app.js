const express = require('express');
const bodyParser = require('body-parser');
const env = require('node-env-file');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

if (process.argv.indexOf('--dev') !== -1) {
  // eslint-disable-next-line
  env(__dirname + '/.env');
}

const {
  DB_USER,
  DB_PASSWORD
} = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@kanban-2jba9.mongodb.net/test`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connect success!');
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());



// require('./routes')(app);

app.listen(3000, () => {
  console.log('Server Start!');
});
