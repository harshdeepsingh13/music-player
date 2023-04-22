const musicSchema = require("../../../schemas/Music");
const mongoose = require("mongoose");

const Music = musicSchema.getModel();

exports.getMusic = (userId) => Music.find(
	{userId, isActive: true},
	{userId: 0},
	{sort: {updatedAt: -1}}
)

exports.saveUpload = async (userId, uploadedAudio, originalFileName) => {

	const {secure_url} = uploadedAudio;
	let music = new Music({
		userId,
		fullUrl: secure_url,
		originalFileName
	});

	music = await music.save();
	delete music._doc.userId;
	return music;
}

exports.deleteMusic = (userId, musicId) => {
	return Music.findOneAndUpdate(
		{userId, _id: mongoose.Types.ObjectId(musicId), isActive: true},
		{isActive: false},
		{new: true}
	);
}

exports.renameMusic = (userId, music) => {
	return Music.findOneAndUpdate(
		{userId, isActive: true, _id: mongoose.Types.ObjectId(music._id)},
		{originalFileName: music.originalFileName},
		{new: true}
	)
}
