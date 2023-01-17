const winston = require('winston');

const {createLogger, format: {combine, timestamp, printf, colorize}} = winston;

const myFormat = printf(({level, message, label, timestamp}) => {
	return `${level} [${timestamp}] ${message}`;
});

module.exports = createLogger({
	format: combine(
		colorize(),
		timestamp(),
		myFormat,
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({filename: 'logs.log'}),
	],
});


