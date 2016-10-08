var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (room) {
      // open a promise
      return new Promise(function(resolve, reject) {
        // intitialize query
        var query = '';

        // make our mysql query
        if (room !== 'lobby') {
          var select = 'SELECT * FROM messages INNER JOIN rooms';
          var on = 'ON rooms.name = "' + room + '" AND rooms.id = messages.room_id;';
          
          query = select + on;
        } else {
          query = 'SELECT * FROM messages;';
        }

        // return the data
        db.query(query, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });

      })
      .then(function(data) {
        return data;
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (user) {},
    post: function (reqData) {
      // open a promise
      return new Promise(function(resolve, reject) {

        // check if user exists in users table
        module.exports.users.get(reqData.user)
          .then(function(data) {
            var query = '';

            
          })
          .catch(function(err) {
            var query = '';

            var insert = 'INSERT INTO users (name)';
            var values = 'VALUES (' + reqData.name + ');';

            db.query(query, function(err, data) {});
          });

      })
      .then(function(data) {});
    }
  }
};

