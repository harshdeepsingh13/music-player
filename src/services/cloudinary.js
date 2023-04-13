import {uploadAudioAPI} from "./axios";

export const uploadAudio = async (file) => {
	const formData  = new FormData();
	formData.append("music", file)
	const response = await uploadAudioAPI(formData);
	console.log("response", response);
}

