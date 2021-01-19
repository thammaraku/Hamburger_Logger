// Import connection.js
var connection = require("./connection");


// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


var orm = {

    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            // console.table(result);
            cb(result);
        });
    },

    insertOne: function (tableInput, colToAdd, valOfCol, cb) {

        // console.log(tableInput);
        // console.log(colToAdd);
        // console.log(valOfCol);

        var queryString = "INSERT INTO " + tableInput;

        queryString += " (";
        queryString += colToAdd.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(valOfCol.length);
        queryString += ") ";
    
        // console.log(queryString);

        connection.query(queryString, valOfCol, function (err, result) {
            if (err) throw err;
            // console.table(result);
            cb(result);
        });
    },


    updateOne: function (tableInput, valOfCol, condition, cb) {

        // console.log(tableInput);
        // console.log(valOfCol);
        // console.log(condition);

        var queryString = "UPDATE " + tableInput;

        queryString += " SET ";
        queryString += objToSql(valOfCol);
        queryString += " WHERE ";
        queryString += condition;
    
        // console.log(queryString);

        connection.query(queryString, [tableInput, valOfCol, condition], function (err, result) {
            if (err) throw err;
            // console.table(result);
            cb(result);
        });
    },

    deleteOne: function (tableInput, condition, cb) {

        // console.log(tableInput);
        // console.log(condition);

        var queryString = "DELETE FROM " + tableInput;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }

};


// Export ORM Object for Model burger.js to use
module.exports = orm;