var createError = require('http-errors');
var express = require('express');
var path = require('path');
var dotenv= require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'n@ds241875.mlab.com:41875/'+process.env.DB_NAME;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var mongo= require('mongodb');
var weather=require('./services/weather.js');

var app = express();
/*mongoose.connect(mongodb,
  (err) => {
    if(err) console.log(err);
});*/

weather.getWeather();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
