var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

router.use((req, res, next) => {
    req.collection = req.db.collection("email");
    next();
});

router.post("/", (req, res, next) => {
    let email = req.body;
    res.send(req.body);
     req.collection.insert(req.body).then(result => {
         res.send({ success: true });
     }).catch(err => {
         res.send({ success: false });
     });
    // let transporter = nodemailer.createTransport({
    //      service: 'gmail',
    //      auth: {
    //          user: 'anamarin@unicauca.edu.co',
    //          pass: '191012seekquiet'
    //      }
    //  });
    // let mailOptions = {
    //     from: ' <anamarin@unicauca.edu.co>', 
    //     to: 'juanmarinmartinez@gmail.com', 
    //     subject: 'Hello ✔', 
    //     text: 'Hello world ?', 
    //     html: '<b>Hello world ?</b>'
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         res.send({ success: false, error: error, info: info });
    //         return console.log(error);
    //     }
    //     res.send({ success: true });
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });

   
});

// send mail with defined transport object

module.exports = router;