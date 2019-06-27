const Joi = require('joi');

module.exports = {
  createTask(req, res, next) {
    try {
      const schema = {
        name: Joi.string(),
        columnId: Joi.string(),
      };

      const errors = Joi.validate(req.body, schema);

      if (errors) {
        switch (errors) {
          case 'name':
            return res.status(422).send({
              name: 'Task name field is required!',
            });
            break;
          case 'columnId':
            return res.status(422).send({
              columnId: 'Column Id is required!',
            });
            break;
          default:
            return res.status(422).send({
                message: 'Invalid data!',
              }
            );
            break;
        }
      }
      next();
    } catch (error) {
      return res.status(500).send({
        message: 'Something went wrong!',
      });
    }
  }
};
