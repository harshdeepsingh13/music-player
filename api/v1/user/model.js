const userSchema = require("../../../schemas/User");
const {comparePassword} = require("../../../services/password");

const User = userSchema.getModel();

exports.addNewUser = (userData) => {
	return new User(userData).save();
}

exports.getUserDetails = async (filter, projection = {}, matchPassword = false) => {
	let finalProjection = {...projection};

	if (matchPassword) {
		const password = filter.password;
		delete filter.password;
		finalProjection = {...finalProjection, email: 1, password: 1}
		const user = await User.findOne({...filter, isActive: true}, finalProjection);
		if (user && comparePassword(user.password, password))
			return user;
		return null;
	}
	return User.findOne({...filter, isActive: true}, finalProjection);
};
