import {LOCAL_STORAGE_KEY} from "../config";

export const getToken = () => {
	return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
}

export const setToken = (token) => {
	return localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
}

export const removeToken = () => {
	return localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN)
}
