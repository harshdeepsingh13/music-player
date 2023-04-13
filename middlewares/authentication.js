const {decode} = require("../services/jwt");
const {getUserDetails} = require("../api/v1/user/model");

module.exports = async (req, res, next) => {
	if (!req.headers.authorization) {
		req.error = {
			status: 400, message: "Authentication token required."
		};
		return next(new Error());
	}

	try {
		const {email} = decode(req.headers.authorization.split('Bearer ')[1]);
		const user = await getUserDetails({email}, {email: 1, _id: 1});
		if (!user) {
			req.error = {status: 404, message: "User not found!"};
			return next(new Error());
		}
		req.user = user;
		next();
	} catch (e) {
		console.log("e ", e)
		next(e);
	}
}
