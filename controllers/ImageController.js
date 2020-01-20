const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
const fetch = require('node-fetch');

global.fetch = fetch;

const { UNSPLASH_ACCESS_KEY } = process.env;

const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY });

module.exports = {
  async getRandomPhoto(req, res) {
    unsplash
      .photos
      .getRandomPhoto({
        orientation: 'landscape',
      })
      .then(toJson)
      .then((data) => {
        res.send(data);
      });
  },
};
