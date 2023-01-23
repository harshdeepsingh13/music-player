import axios from 'axios';
import {API_ROUTES} from "../config";
import {getToken} from "./localStorage";

const axiosInstance = axios.create({baseURL: API_ROUTES.BASE_URL_V1, headers: {authorization: `Bearer ${getToken()}`}});

export const registerUserAPI = (data) => axios({
	method: "POST",
	url: API_ROUTES.BASE_URL_V1 + API_ROUTES.REGISTER_USER,
	data
});

export const fetchUserDetailsAPI = () => {
};
export const loginUserAPI = (data) => axios({
	method: "POST",
	url: API_ROUTES.BASE_URL_V1 + API_ROUTES.LOGIN_USER,
	data
});
