const { getTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/TasksController');
const { getColumns } = require('../controllers/ColumnsController');

// const {} = require('');

module.exports = (app) => {
  app.get('/', (req, res) => {
    return res.send('Hello world!');
  });

  // operations with tasks
  app.get('/tasks', getTasks);
  app.post('/task', createTask);
  app.get('/task/:id', getTaskById);
  app.patch('/task/:id', updateTask);
  app.delete('/task/:id', deleteTask);

  // operations with columns
  app.get('/columns', getColumns);
  app.post('/column');
  app.patch('/column/:id');
  app.delete('/column/:id');

};
