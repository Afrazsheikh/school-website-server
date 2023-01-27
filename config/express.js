const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const winstonInstance = require('./winston');
const routes = require('../index.route');
const APIError = require('../server/helpers/APIError');
require('dotenv').config();

const app = express();
let expressWs = require('express-ws')(app);

if (process.env.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (process.env.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map((error) => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (process.env.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }));
}

// error handler, send stacktrace only during development
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.status).json({
    success:false,
    message: err.isPublic ? err.message : httpStatus[err.status],
  })
});

module.exports = app;
