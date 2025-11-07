const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);

// Catch 404 and return JSON error
app.use(function(req, res, next) {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    status: 404
  });
});

// Error handler - return JSON errors
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  const response = {
    error: err.message || 'Internal Server Error',
    status: status
  };

  // Include stack trace in development
  if (req.app.get('env') === 'development') {
    response.stack = err.stack;
  }

  res.status(status).json(response);
});

module.exports = app;
