const {mongodbConnectionURL} = require("../config");
const logger = require('./logger');
const mongoose = require('mongoose');

module.exports = () => {
	mongoose.set('strictQuery', true);
	mongoose.connect(mongodbConnectionURL, {useNewUrlParser: true, useUnifiedTopology: true})
		.then(r => logger.info("Connection with DB is successful."))
		.catch(err => logger.error(`Error in connecting with DB - ${err}`));
};
