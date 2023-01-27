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

		const user = await getUserDetails({email, password}, null, {matchPassword: true});

		if (!user) {
			req.error = {status: 404, message: "Email/Password combination doesn't match"};
			return next(new Error());
		}

		const jwtToken = encode({email: user.email});
		console.log("user.email", user.email);
		res.status(200).json({data: {token: jwtToken}, message: `User found, and logged in!`});

	} catch (e) {
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}

exports.getUserDetailsController = async (req, res, next) => {
	try {
		const {email} = req.user;
		let userDetails = await getUserDetails({email}, {_id: 0, email: 1, firstName: 1, lastName: 1});
		userDetails._doc.name = `${userDetails.lastName}, ${userDetails.firstName}`;
		// console.log("userDetails", JSON.stringify(userDetails, null, 2));
		console.log("userDetails.name", Object.keys(userDetails));
		res.status(200).json({message: "User Details fetched", data: userDetails})

	} catch (e) {
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}

