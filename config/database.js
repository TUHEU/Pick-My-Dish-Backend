const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'kynmmarshall', // Default XAMPP user
  password: process.env.DB_PASSWORD || 'Kamdeu2007....', // Default XAMPP password is empty
  database: process.env.DB_NAME || 'pick_my_dish'
});

// Use connection.promise() for async/await
const promiseConnection = connection.promise();

module.exports = { connection, promiseConnection };