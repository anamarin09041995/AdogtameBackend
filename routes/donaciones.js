var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    req.collection = req.db.collection("donaciones");
    next();
});

router.post("/", (req, res, next) => {
    let book = req.body;
    req.collection.insert(book).then(result => {
        res.send({ success: true });
    }).catch(err => {
        res.send({ success: false });
    });
});