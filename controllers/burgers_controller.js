// Use router to create new router object to handle requests
var express = require("express");
var router = express.Router();

// Import model to use its database function
var burger = require("../models/burger.js");


router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var handleBarsObject = {
            burgers: data
        };
        console.log(handleBarsObject);
        res.render("index", handleBarsObject);
    });
});

router.post("/api/burgers", function (req, res) {

    console.log("req.body.burger_name = " + req.body.burger_name);
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId });
    });
});


router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // console.log("controller condition = " + condition);
    // console.log("controller req.body.devoured = " + req.body.devoured);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.deleteOne(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});



// Export routes for server.js to use.
module.exports = router;