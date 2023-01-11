const app = require('./config/express');
const logger = require('./config/logger');
const db = require('./config/mongo');
const http = require('http');
require('dotenv').config();

if (!module.parent) {
	let server = http.createServer(app);
	server.listen(process.env.PORT || process.env.port);
    logger.info(`server started on port ${process.env.port} (${process.env.env})`); // eslint-disable-line no-console
	
}

module.exports = app;
