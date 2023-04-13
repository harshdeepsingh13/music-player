export const ROUTE_PATH = {SIGNIN: "/login", SIGNUP: "/signup", INDEX: "/"}

export const ERROR_MESSAGES = {
	REQUIRED_FIELD: "* Required Field",
	PASSWORD_NOT_MATCHING: "Both passwords should match!",
	EMAIL_FORMAT_INVALID: "Please enter valid email!"
};

export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const LOCAL_STORAGE_KEY = {
	TOKEN: "auth_token",
	USER_DETAILS: "user_details"
};

export const API_ROUTES = {
	BASE_URL_V1: "/api/v1",
	REGISTER_USER: "/user/register",
	LOGIN_USER: "/user/login",
	USER_DETAILS: "/user",
	UPDATE_USER: "/user",
	UPLOAD_AUDIO: "/music",
	FETCH_MEDIA: "/music",
	DELETE_MEDIA: (id) => `/music/${id}`,
	RENAME_MEDIA: id => `/music/rename/${id}`
};

export const LOADER_ORIENTATION = {VERTICAL: "vertical", HORIZONTAL: "horizontal"};
