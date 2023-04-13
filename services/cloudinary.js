const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const API_SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PREFIX = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const FOLDER = process.env.REACT_APP_CLOUDINARY_FOLDER_NAME;

cloudinary.config({
	secure: true,
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,

});

exports.uploadAudio = async (audioFile) => {
	const {path} = audioFile;
	const uploadData = await cloudinary.uploader.upload(path, {
		resource_type: "auto",
		upload_preset: UPLOAD_PREFIX,
	});
	fs.unlinkSync(path);
	return uploadData;
	// console.log("result", result);
}
