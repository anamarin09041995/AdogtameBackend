var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    req.collection = req.db.collection("email");
    next();
});

router.get("/email", (req, res, next) => {
    //let email = req.params.email;
    res.send({ success: true });
    // req.collection.insert(email).then(result => {
    //     res.send({ success: true });
    // }).catch(err => {
    //     res.send({ success: false });
    // });
});

module.exports = router;