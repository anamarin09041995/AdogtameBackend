'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anamarin@unicauca.edu.co',
        pass: '191012seekquiet'
    }
});

// setup email data with unicode symbols
// let mailOptions = {
//     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//     to: '', // list of receivers
//     subject: 'Adopcion', // Subject line
//     text: 'Gracias por ser parte del cambio y ayudar a hacer felices mas animales', // plain text body
//     html: '<b>Adopcion</b>' // html body
// };

let mailOptions ={from: from, to: to, subject: subject, text: text, html: html};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});