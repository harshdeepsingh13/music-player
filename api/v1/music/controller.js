const {getMusic, saveUpload, deleteMusic, renameMusic} = require("./model");
const {uploadAudio} = require("../../../services/cloudinary");
exports.getMusicController = async (req, res, next) => {
	try {
		const {_id: userId} = req.user;

		const music = await getMusic(userId);

		res.status(200).json({message: "Music for this user found", data: {music}})

	} catch (e) {
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}

exports.addNewMusicController = async (req, res, next) => {
	try {
		const file = req.file;

		console.log("body", req.file);

		const uploadedAudio = await uploadAudio(file);
		const finalUpload = await saveUpload(req.user._id, uploadedAudio, file.originalname);
		res.status(200).json({message: "Audio Successfully saved", data: {newAudio: finalUpload}});
	} catch (e) {
		console.log("e", e);
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}

exports.deleteMusicController = async (req, res, next) => {
	try {
		const {musicId} = req.params;
		const {_id} = await deleteMusic(req.user._id, musicId);
		res.status(200).json({
			message: "Audio Successfully deleted",
			data: {deletedId: _id}
		});
	} catch (e) {
		console.log("e", e);
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}

exports.renameMusicController = async (req, res, next) => {
	try {
		const {musicId} = req.params;
		const {name} = req.body;
		const music = await renameMusic(req.user._id, {_id: musicId, originalFileName: name})
		res.status(200).json({message: "Rename Successful", data: {music}})
	} catch (e) {
		console.log("e", e);
		req.error = {status: 500, message: "An Error occurred!"}
		return next(new Error(e.message));
	}
}
