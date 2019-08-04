const express = require('express');
const passport = require('../libs/passport');

const { getTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/TasksController');
const { getColumns } = require('../controllers/ColumnsController');
const { logout, auth } = require('../controllers/AuthController');

const privateRouter = express.Router();
privateRouter.use(passport.authenticate('jwt', { session: false }));

// operations with tasks
privateRouter.get('/tasks', getTasks);
privateRouter.post('/task', createTask);
privateRouter.get('/task/:id', getTaskById);
privateRouter.patch('/task/:id', updateTask);
privateRouter.delete('/task/:id', deleteTask);

// operations with columns
privateRouter.get('/columns', getColumns);
privateRouter.post('/column');
privateRouter.patch('/column/:id');
privateRouter.delete('/column/:id');

privateRouter.get('/auth', auth);
privateRouter.post('/logout', logout);

module.exports = privateRouter;
