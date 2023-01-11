const winston = require('winston');
const log4js = require('log4js');
const log4js_extend = require("log4js-extend");

log4js_extend(log4js, {
    path: __dirname,
    format: "(@file:@line:@column)"
  });
const logger = log4js.getLogger('DEMO');
logger.level = 'trace';

module.exports = logger;
