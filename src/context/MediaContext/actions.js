import {deleteMediaAPI, fetchMediaAPI, renameMediaAPI, uploadAudioAPI} from "../../services/axios";

export default (state, updateState, loaderSetters, pushToast) => {
	const {
		setFetchMediaLoader,
		updateMediaActionsLoader,
		setUploadMediaLoader
	} = loaderSetters;
	return {
		uploadMedia: async (file) => {
			try {
				setUploadMediaLoader(true);
				const formData = new FormData();
				formData.append("music", file)
				const {data: {data}} = await uploadAudioAPI(formData);
				updateState({media: [{...data.newAudio}, ...state.media]})
				pushToast({text: "Media Uploaded successfully", variant: "success"})
			} catch (e) {
				pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				setUploadMediaLoader(false);
			}
		},
		fetchMedia: async () => {
			try {
				setFetchMediaLoader(true);
				const {data: {data}} = await fetchMediaAPI();
				updateState({media: data.music})
			} catch (e) {
				pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				setFetchMediaLoader(false);
			}
		},
		deleteMedia: async (musicId, successCallback) => {
			try {
				updateMediaActionsLoader(true, musicId);
				await deleteMediaAPI(musicId);
				successCallback && successCallback();
				pushToast({text: "Media deleted successfully", variant: "success"})
			} catch (e) {
				pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				updateMediaActionsLoader(false, musicId);
			}
		},
		renameMedia: async (musicId, name, successCallback) => {
			try {
				updateMediaActionsLoader(true, musicId);
				const {data: {data}} = await renameMediaAPI(musicId, name)
				const toUpdateIndex = state.media.findIndex(({_id}) => _id === data.music._id);
				updateState({
					media: [
						...state.media.slice(0, toUpdateIndex),
						{...data.music},
						...state.media.slice(toUpdateIndex + 1)
					]
				});
				successCallback && successCallback();
				pushToast({text: "Media renamed successfully", variant: "success"})
			} catch (e) {
				pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				updateMediaActionsLoader(false, musicId);
			}
		}
	};
}
