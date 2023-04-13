const mongoose = require("mongoose");
const {model} = mongoose;

const User = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	rollbackSeconds: {type: Number, required: true, default: 10},
	isActive: {type: Boolean, default: true},
}, {timestamps: true});

const getModel = () => model("user", User);

module.exports = {schema: User, getModel};
