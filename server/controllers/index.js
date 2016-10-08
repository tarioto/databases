var models = require('../models');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (req, res) {
      // open a promise
      return new Promise(function(resolve, reject) {
        return models.messages.get(req.body) // arg to get is the chat room name
          .then(function(data) {
            resolve(data);
          });
      })
      .then(function(data) {
        res.send(JSON.stringify(data));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

