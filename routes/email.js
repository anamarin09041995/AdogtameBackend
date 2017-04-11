var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    req.collection = req.db.collection("email");
    next();
});

router.post("/", (req, res, next) => {
    //let email = req.params.email;
    res.send(req.body);
    // req.collection.insert(email).then(result => {
    //     res.send({ success: true });
    // }).catch(err => {
    //     res.send({ success: false });
    // });
});

module.exports = router;