// Import ORM object to use to create function that will interact with database
var orm = require("../config/orm");


var burger = {

    selectAll: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result);
        });
    },

    insertOne: function(colToAdd, valOfCol, cb) {
        orm.insertOne("burgers", colToAdd, valOfCol, function(result) {
            cb(result);
        });
    },

    updateOne: function(valOfCol, condition, cb) {
        orm.updateOne("burgers", valOfCol, condition, function(result) {
            cb(result);
        });
    },

    deleteOne: function(condition, cb) {
        orm.deleteOne("burgers", condition, function(result) {
            cb(result);
        });
    }

};

// Export the database functions for controller to use burgers_controller.js
module.exports = burger;