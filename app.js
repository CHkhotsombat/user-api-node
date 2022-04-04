import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { htmlStatus } from './app/utils/constants'
import { router as indexRouter } from './app/routes'
import _ from 'lodash'
import { errorNotFound } from './app/utils/apiHelpers'
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(errorNotFound());
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const status = err.status || err.output?.statusCode || 500
  const resStatus = htmlStatus(status)

  if (!_.isEmpty(err.errors)) {
    res.status(status).json({
      code: resStatus.code,
      message: err.message || resStatus.message,
      errors: err.errors
    })
  } else {
    res.status(status).json({
      code: resStatus.code,
      message: err.message || resStatus.message
    })
  }  
});

module.exports = app;
