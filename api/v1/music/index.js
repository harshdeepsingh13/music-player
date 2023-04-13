const {getMusicController, addNewMusicController, deleteMusicController, renameMusicController} = require("./controller");
const multer = require("multer");
const path = require("path");

const app = require('express').Router();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + " " + file.originalname) //Appending extension
	}
});

const upload = multer({storage})

app.get("/", getMusicController);
app.post("/", upload.single('music'), addNewMusicController);
app.delete("/:musicId", deleteMusicController)
app.put("/rename/:musicId", renameMusicController);

module.exports = app;
