// Use router to create new router object to handle requests
var express = require('express');
var router = express.Router;

// Import model to use its databas function
var burger = require("../models/burger.js");


router.get("/", function(req, res) {

    burger.selectAll(function(data) {
        var handleBarsObject = {
            burgers: data
        };
        console.log(handleBarsObject);
        res.render("index", handleBarsObject);
    });
});

router.post("/api/burgers", function(req, res) {

    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});


router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition = " + condition);

        burger.updateOne({
            devoured: req.body.devoured
        }, condition, function(result) {
            if(result.changedRows == 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        });
});

// Export routes for server.js to use.
module.exports = router;