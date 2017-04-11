var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

router.use((req, res, next) => {
    req.collection = req.db.collection("email");
    next();
});

router.post("/", (req, res, next) => {
    let email = req.body;
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'yourpass'
    }
});
    req.collection.insert(email).then(result => {
        res.send({ success: true });
    }).catch(err => {
        res.send({ success: false });
    });
});

module.exports = router;