// Import ORM object to use to create function that will interact with database
var orm = require("../config/orm.js");


var burger = {

    selectAll: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result);
        });
    },

    insertOne: function(cb) {
        orm.insertOne("burgers", colToAdd, valOfCol, function(result) {
            cb(result);
        });
    },

    updateOnce: function(cb) {
        orm.updateOnce("burgers", valOfCol, condition, function(result) {
            cb(result);
        });

    }

};

// Export the database functions for controller to use burgers_controller.js
module.exports = burger;