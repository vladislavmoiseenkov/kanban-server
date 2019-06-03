const ColumnModel = require('../models/Column');

module.exports = {
  async getColumns(req, res) {
    try {
      const columns = await ColumnModel.find({}, (err, column) => column);

      res.status(200).send({
        message: 'Success',
        columns
      });
    } catch (e) {
      console.error(e);
    }
  }
};
