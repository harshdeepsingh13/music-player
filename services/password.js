const bcrypt = require("bcryptjs");

const saltRounds = 10;

exports.encryptPassword = password => {
	return bcrypt.hashSync(password, saltRounds)
};

exports.comparePassword = (encryptedPassword, plainTextPassword) =>
	bcrypt.compareSync(plainTextPassword, encryptedPassword);
