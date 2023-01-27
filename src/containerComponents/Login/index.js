import React, {useCallback, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import InputController from "../../components/InputController";
import ButtonWrapper from "../../components/ButtonWrapper";
import {useUserContext} from "../../context/UserContext";
import {ERROR_MESSAGES, ROUTE_PATH} from "../../config";
import FullPageLoader from "../../components/FullPageLoader";
import {useNavigate} from "react-router-dom";

const IDS = {EMAIL: "email"}

const Login = props => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorFields, setErrorFields] = useState([]);
	const [loginError, setLoginError] = useState({isError: false, message: ""});

	const {loaders: {registerUserLoader}, actions: {loginUser}} = useUserContext();
	const navigate = useNavigate();

	const removeErrorFields = useCallback((...fields) => {
		setErrorFields(prevState => {
			fields.forEach((field) => {
				if (prevState.includes(field)) {
					const index = prevState.findIndex((element) => element === field);
					prevState = [...prevState.slice(0, index), ...prevState.slice(index + 1)];
				}
			})
			return [...prevState];
		})

	}, []);

	const addErrorFields = useCallback((...fields) => {
		setErrorFields(prevState => {
			const tempSet = new Set(prevState);
			fields.forEach(field => tempSet.add(field));
			return Array.from(tempSet);
		})
	}, []);

	const changeValue = useCallback((id, value, setter) => {
		removeErrorFields(id);
		setter(value);
	}, []);

	const validateData = useCallback((data) => {
		let isDataValid = true;
		const {email, password} = data;
		if (!email) {
			addErrorFields(IDS.EMAIL);
			isDataValid = false;
		}

		if (!password) {
			addErrorFields(IDS.PASSWORD)
		}
		return isDataValid;
	}, []);

	const onLoginClick = () => {
		const data = {email, password};
		if (validateData(data)) {
			setLoginError(prevState => ({...prevState, isError: false}));
			const emailPasswordErrorCallback = (message) => {
				setLoginError({isError: true, message});
			};
			const successCallback = () => {
				window.location.href = ROUTE_PATH.INDEX;
			}
			loginUser(data, successCallback, emailPasswordErrorCallback);
		}
	};

	const handleEnterKeyPress = useCallback(({key}) => {
		if (key === "Enter") {
			onLoginClick();
		}
	}, [onLoginClick]);

	return <>
		<div className="login-container">
			{registerUserLoader && <FullPageLoader message={"Fetching your details"}/>}
			{
				loginError.isError &&
				<div className="login-error-container">
					{loginError.message}
				</div>
			}
			<InputController
				type={"email"}
				id={IDS.EMAIL}
				required={true}
				value={email}
				placeholder={"Enter your registered Email"}
				label={"Email"}
				onChange={value => changeValue(IDS.EMAIL, value, setEmail)}
				onKeyDown={handleEnterKeyPress}
				isInvalid={errorFields.includes(IDS.EMAIL)}
				invalidMessage={ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<InputController
				type={"password"}
				id={IDS.PASSWORD}
				required={true}
				value={password}
				placeholder={"Enter your Password"}
				label={"Password"}
				onChange={value => changeValue(IDS.PASSWORD, value, setPassword)}
				onKeyDown={handleEnterKeyPress}
				isInvalid={errorFields.includes(IDS.PASSWORD)}
				invalidMessage={ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<div className="action-btn-container">
				<ButtonWrapper variant={"outline-primary"} onClick={onLoginClick}>Login</ButtonWrapper>
			</div>
		</div>
	</>
};

Login.propTypes = {
	props: PropTypes.object
};
Login.defaultProps = {
	props: {}
};

export default Login
