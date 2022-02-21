const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { htmlStatuses } = require('./utils/constants');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const _ = require('lodash');
const app = express();
const PORT = process.env.PORT || 3500;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
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
  
  const status = err.status || 500
  const htmlStatus = _.find(htmlStatuses, ['status', status]) || {}

  res.status(status).json({
    code: htmlStatus.code,
    message: err.message || htmlStatus.message
  })
});

module.exports = app;
