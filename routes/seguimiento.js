var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    req.collection = req.db.collection("seguimiento");
    next();
});

router.get("/", (req, res, next) => {
    req.collection.find().toArray().then(data => {
        res.send(data);
    }).catch(err => {
        res.send([]);
    });
});

router.post("/", (req, res, next) => {
    let mascota = req.body;
    req.collection.insert(mascota).then(result => {
        res.send({ success: true });
    }).catch(err => {
        res.send({ success: false });
    });
});

module.exports = router;