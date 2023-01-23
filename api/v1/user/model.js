const userSchema = require("../../../schemas/User");
const {comparePassword} = require("../../../services/password");

const User = userSchema.getModel();

exports.addNewUser = (userData) => {
	return new User(userData).save();
}

exports.getUserDetails = async (filter, matchPassword = false) => {
	let projection = {};

	if (matchPassword) {
		const password = filter.password;
		delete filter.password;
		projection = {...projection, password: 1}
		const user = await User.findOne({...filter, isActive: true}, projection);
		if (user && comparePassword(user.password, password))
			return user;
		return null;
	}
	return User.findOne({...filter, isActive: true}, projection);
};
