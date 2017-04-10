var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;
var cors = require('cors');

// var index = require('./routes/index');
var users = require('./routes/users');
var mascotas = require('./routes/mascotas');
var fundaciones = require('./routes/fundaciones');
var donaciones = require('./routes/donaciones');
var seguimiento = require('./routes/seguimiento');
const nodemailer = require('nodemailer');


var app = express();
app.use(cors());

let dbConnection;
mongodb.connect("mongodb://anamarin:123456@ds147900.mlab.com:47900/adogtame", (err,db)=>{

  if(err){
    console.log("Error:"+err);
  }else{
    console.log("Mongo Conectado");
    dbConnection = db;
  }

});

app.use((req, res, next)=>{

  req.db = dbConnection;
  next();

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.use('/users', users);
app.use('/mascotas', mascotas);
app.use('/fundaciones', fundaciones);
app.use('/donaciones', donaciones);
app.use('/seguimiento', seguimiento);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
