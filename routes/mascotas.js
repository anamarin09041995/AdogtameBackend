var express = require("express");
var router = express.Router();
var ObjectID = require("mongodb").ObjectID;

router.use((req, res, next) => {
    req.collection = req.db.collection("mascotas");
    next();
});

router.get("/", (req, res, next) => {
    req.collection.find().toArray().then(data => {
        res.send(data);
    }).catch(err => {
        res.send([]);
    });
});

module.exports = router;