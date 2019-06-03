const TaskModel = require('../models/Task');

module.exports = {
  async getTasks(req, res) {
    try {
      const tasks = await TaskModel.find({});
      return res.status(200).send({
        tasks,
      });
    } catch (e) {
      console.error(e);
    }
  },
  async createTask(req, res) {
    try {
      const { name, columnId } = req.body;

      const task = await TaskModel.create({
        columnId,
        name
      });

      return res.status(201).send({
        message: 'Task created',
        task
      })
    } catch (e) {
      return res.status(500).send({ e });
    }
  },
  async getTaskById(req, res) {
    try {
      const { id } = req.params;

      const task = await TaskModel.findById(id, (err, task) => {
        if (err) return err;

        return task;
      });

      return res.status(200).send(task);
    } catch (e) {
      return res.status(500).send({ e });
    }
  },
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedTask = await TaskModel.findByIdAndUpdate(id, { name }, (err, task) => {
        if (err) return err;

        return task;
      });
      return res.status(200).send({
        task: updatedTask
      });
    } catch (e) {
        return res.status(500).send(e);
    }
  },
  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      await TaskModel.findByIdAndRemove(id, (err, task) => {
        if (err) return err;

        return task;
      });

      return res.status(200).send({
        message: 'OK'
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
