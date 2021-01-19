// Connect Node to MySQL and Export

// Setup to connect Node to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "grandkey",
    database: "burgers_db"
});

// Make a connection
connection.connect(function(err) {
    if (err) {
        console.error("error connection: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection to ORM to use
module.exports = connection;