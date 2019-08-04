const mongoose = require('mongoose');

const {
  DB_USER,
  DB_PASSWORD,
} = process.env;

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@kanban-2jba9.mongodb.net/kanban`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connect success!');
});
