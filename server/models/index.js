var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (room) {
      // open a promise
      // intitialize query
      var query = '';
      // make our mysql query
      if (room !== 'lobby') {
        select = 'SELECT * FROM messages INNER JOIN rooms';
        on = 'ON rooms.name = "' + room + '" AND rooms.id = messages.room_id';
        
        query = select + on;
      } else {
        query = 'SELECT * FROM messages';
      }
      // return the data
      db.query(query, function(err, data) {

      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

