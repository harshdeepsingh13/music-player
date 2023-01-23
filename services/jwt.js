const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

exports.encode = (data) => {
	return jwt.sign(data, TOKEN_SECRET);
}

exports.decode = (token) => {
	return jwt.verify(token, TOKEN_SECRET);
}
