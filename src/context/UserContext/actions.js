import {fetchUserDetailsAPI, loginUserAPI, registerUserAPI} from "../../services/axios";
import {setToken, setUserDetails} from "../../services/localStorage";

export default (state, updateState, loaderSetters, pushToast) => {
	return ({
		registerUser: async (userData, successCallback) => {
			try {
				loaderSetters.setRegisterUserLoader(true);
				await registerUserAPI(userData);
				pushToast({text: "Your account is completely setup!", variant: "success"})
				successCallback();
			} catch (e) {
				pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				loaderSetters.setRegisterUserLoader(false);
			}
		},
		loginUser: async (data, successCallback, emailPasswordErrorCallback) => {
			try {
				loaderSetters.setRegisterUserLoader(true);
				const {data: dataResponse} = await loginUserAPI(data);
				setToken(dataResponse.data.token);
				pushToast({text: "Login successful", variant: "success"});
				successCallback();
			} catch (e) {
				console.log("e.response.data", e.response.data);
				if (e.response.data.status === 404) {
					emailPasswordErrorCallback(e.response.data.message);
				} else
					pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				loaderSetters.setRegisterUserLoader(false);
			}
		},
		fetchUserDetails: async (successCallback) => {
			try {
				loaderSetters.setFetchUserDetailsLoader(true);
				const {data: {data: userDetails}} = await fetchUserDetailsAPI();
				setUserDetails({name: userDetails.name});
				await updateState({userDetails});
				successCallback && successCallback({name: userDetails.name})
			} catch (e) {
				pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
			} finally {
				loaderSetters.setFetchUserDetailsLoader(false);
			}
		}
	});
};
