var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

router.use((req, res, next) => {
    req.collection = req.db.collection("email");
    next();
});

router.post("/email", (req, res, next) => {
    let email = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anamarin@unicauca.edu.co',
            pass: '191012seekquiet'
        }
    });
    req.collection.insert(email).then(result => {
        res.send({ success: true });
        let mailOptions = {
            from: 'anamarin@unicauca.edu.co', // sender address
            to: 'anamarin@unicauca.edu.co', // list of receivers
            subject: email.subject, // Subject line
            text: email.text, // plain text body
            html: email.html // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }).catch(err => {
        res.send({ success: false });
    });
});

module.exports = router;
