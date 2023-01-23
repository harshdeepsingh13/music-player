const {addNewUser, getUserDetails} = require("./model");
const {encryptPassword, comparePassword} = require("../../../services/password");
const {encode} = require("../../../services/jwt");

exports.registerUserController = async (req, res, next) => {
	try {
		const data = req.body;
		const requiredFields = ["firstName",
			"lastName",
			"email",
			"password"];

		const isDataValid = !requiredFields.every(field => !!data[field]);

		if (isDataValid) {
			req.error = {status: 400, message: "Bad Request!"}
			return next(new Error());
		}

		data.password = encryptPassword(data.password);

		await addNewUser(data)

		res.status(200).json({message: `User created successfully!`});
	} catch (e) {
		req.error = {status: 409, message: "An account with this email already exists."}
		return next(new Error(e.message));
	}
}

exports.loginUserController = async (req, res, next) => {
	try {
		const {email, password} = req.body;

		const user = await getUserDetails({email, password}, true);

		if (!user) {
			req.error = {status: 404, message: "Email/Password combination doesn't match"};
			return next(new Error());
		}

		const jwtToken = encode({email: user.email});
		res.status(200).json({token: jwtToken, message: `User found, and logged in!`});

	} catch (e) {
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}
