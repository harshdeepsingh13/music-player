const mongoose = require("mongoose");
const {model} = mongoose;

const Music = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "users"
	},
	fullUrl: {
		type: String,
		required: true,
	},
	providerName: {
		type: String,
		required: true,
		default: 'cloudinary',
	},
	originalFileName: {
		type: String,
		required: true
	},
	isActive: {type: Boolean, default: true},
}, {timestamps: true});

const getModel = () => model("music", Music);

module.exports = {schema: Music, getModel};

/*
	shortName: {
		type: String,
		required: true,
	},*/
