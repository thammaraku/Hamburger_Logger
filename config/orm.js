// Import connection.js

var connection = require("./connection.js");


// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection

var orm = {

    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            console.table(result);
            cb(result);
        });
    },

    insertOne: function (tableInput, colToAdd, valOfCol, cb) {
        var queryString = "INSERT INTO ?? (??) VALUES (?)";


        // CALVIN CODE TO RETURN
        // var queryString = "INSERT INTO " + table;
        // queryString += " (";
        // queryString += cols.toString();
        // queryString += ") ";
        // queryString += "VALUES (";
        // queryString += printQuestionMarks(vals.length);
        // queryString += ") ";

        // console.log(queryString);

        connection.query(queryString, [tableInput, colToAdd, valOfCol], function (err, result) {
            if (err) throw err;
            console.table(result);
            cb(result);
        });
    },


    updateOne: function (tableInput, valOfCol, condition, cb) {

        var queryString = "UPDATE ?? SET ?? WHERE ?";

        // CALVIN CODE TO RETURN
        // var queryString = "UPDATE " + table;
        // queryString += " SET ";
        // queryString += objToSql(objColVals);
        // queryString += " WHERE ";
        // queryString += condition;


        connection.query(queryString, [tableInput, valOfCol, condition], function (err, result) {
            if (err) throw err;
            console.table(result);
            cb(result);
        });
    }
    };


// Export ORM Object for Model burger.js to use
module.exports = orm;