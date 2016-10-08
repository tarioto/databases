var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports = mysql.createConnection({
  // host: '127.0.0.1', // not sure about this
  port: '3306',
  user: 'root',
  // password: 'Root',
  database: 'chat'
});

// don't need this because a query will implicitly open a connection
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   } else {
//     console.log('connected as id ' + connection.threadId);
//   }
// });
