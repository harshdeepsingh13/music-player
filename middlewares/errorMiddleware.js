const logger = require('../services/logger');

module.exports = (err, req, res, next) => {
	logger.error(`[ errorMiddleware.js ] Error occurred --- ${err}`)
	if (req.error) {
		const {
			status,
			message
		} = req.error;
		res.status(status).json({
			status,
			message
		})
	} else {
		res.status(500).json(
			{
				status: 500,
				message: "Internal Server Error"
			}
		)
	}
}
