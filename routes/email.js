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
            user: 'anamarin@unicauca.edu.co',
            pass: '191012seekquiet'
        }
    });
    let mailOptions = {
        from: '"Fred Foo 👻" <anamarin@unicauca.edu.co>', // sender address
        to: 'anamarin@unicauca.edu.co', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    req.collection.insert(email).then(result => {
        res.send({ success: true });
    }).catch(err => {
        res.send({ success: false });
    });
});

let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object

module.exports = router;