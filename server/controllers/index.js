var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // somehow extract which room the get request was called from
      var room; // req.body
      // call models.messages.get()
      var data = models.messages.get(room);
      // attach to res
      res.end(JSON.stringify(data));
      // return res
      return res;
    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

