var mysql = require('mysql2');
var conn = mysql.createPool({
  host: 'localhost', // host name
  user: 'root',      // database username
  password: 'root',      // database password
  database: 'proj_ver1' // // database Name
});

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });

var sql = 'SELECT * FROM users';
conn.query(sql, function (err, data) {
  if (err) throw err;
  console.log(data);
});

module.exports = conn;