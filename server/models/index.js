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
    post: function (messageObject) {
      return new Promise(function(resolve, reject) {
        return module.exports.users.get(messageObject.username)
          .then(function(userId) {
            return module.exports.rooms.get(messageObject.roomname)
              .then(function(roomId) {
                var query = 'INSERT INTO messages (text, userId, roomId) VALUES ("' + userId + '", "' + roomId + '");';
              });
          });
      })
      .then(function(data) {
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (targetUser) {
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
        var userNotInUsers = data.map(function(user) { return user.username; }).indexOf(targetUser) === -1;

        if (userNotInUsers) {
          return module.exports.users.post(targetUser)
            .then(function(userId) {
              return userId;
            });
        } else {
          var userId = data.reduce(function(found, user) {
            return found !== null ? found : user.username === targetUser ? user.id : null;
          }, null);
          return userId;
        }

      })
      .catch(function(error) {
        return error;
      });
    },
    post: function (user) {
      return new Promise(function(resolve, reject) {
        var query = 'INSERT INTO users (username) VALUES ("' + user + '");';

        db.query(query, function(err, data) {
          console.log(data);
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      })
      .then(function(data) {
        return data.insertId;
      })
      .catch(function(error) {
        return error;
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (targetRoom) {
      return new Promise(function(resolve, reject) {
        var query = 'SELECT * FROM rooms;';

        db.query(query, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      })
      .then(function(data) {
        var roomNotInRooms = data.map(function(room) { return room.roomname; }).indexOf(targetRoom) === -1;

        if (roomNotInRooms) {
          return module.exports.rooms.post(targetRoom)
            .then(function(roomId) {
              return roomId;
            });
        } else {
          var roomId = data.reduce(function(found, room) {
            return found !== null ? found : room.roomname === targetRoom ? room.id : null;
          }, null);
          return roomId;
        }

      })
      .catch(function(error) {
        return error;
      });
    },
    post: function (room) {
      return new Promise(function(resolve, reject) {
        var query = 'INSERT INTO rooms (roomname) VALUES ("' + room + '");';

        db.query(query, function(err, data) {
          console.log(data);
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      })
      .then(function(data) {
        return data.insertId;
      })
      .catch(function(error) {
        return error;
      });
    }
  }
};

