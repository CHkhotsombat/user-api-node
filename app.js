const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { htmlStatus } = require('./app/utils/constants');
const indexRouter = require('./app/routes/index');
const app = express();
const _ = require('lodash');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  const status = err.status || 500
  const resStatus = htmlStatus()[`${status}`] || {}

  if (!_.isEmpty(err.errors)) {
    res.status(status).json({
      code: resStatus.code,
      message: err.message || resStatus.message,
      errors: _.map(err.errors, ((obj) => (   
        obj.message?.toString().replaceAll('"', "")
      )))  
    })
  } else {
    res.status(status).json({
      code: resStatus.code,
      message: err.message || resStatus.message
    })
  }  
});

module.exports = app;
