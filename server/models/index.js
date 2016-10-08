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
        var select = 'SELECT messages.objectId, messages.text, messages.createdAt, users.username, rooms.roomname FROM messages ';
        var innerJoin1 = 'INNER JOIN rooms ON rooms.roomname = "' + room + '" AND rooms.id = messages.roomId ';
        var innerJoin2 = 'INNER JOIN users ON users.id = messages.userId;';
        
        query = select + innerJoin1 + innerJoin2;

        // return the data
        db.query(query, function(err, data) {
          if (err) {
            reject(err);
          } else {
            console.log('model data: ', data);
            resolve(data);
          }
        });

      })
      .then(function(data) {
        return data;
      })
      .catch(function(error) {
        return error;
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise(function(resolve, reject) {
        var query = 'SELECT * FROM users;';

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
      })
      .catch(function(error) {
        return error;
      });
    },
    post: function (user) {
      return new Promise(function(resolve, reject) {
        var query = 'INSERT INTO users (username) VALUES (' + user + ');';

        db.query(query, function(err) {
          if (err) {
            reject(err);
          }
        });
      })
      .catch(function(error) {
        return error;
      });
    }
  }
};

