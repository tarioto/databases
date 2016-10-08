var db = require('../db');

module.exports = {
  messages: {
    get: function (room) {
      // intitialize query
      var query = '';
      // make our mysql query
      if (room !== 'lobby') {
        selection = 'SELECT * FROM messages INNER JOIN rooms';
        on = 'ON';
        query = selection + on;
      } else {
        query = 'SELECT * FROM messages';
      }
      // return the data
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

