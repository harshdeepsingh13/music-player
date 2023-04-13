import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import InputController from "../../components/InputController";
import {EMAIL_REGEX, ERROR_MESSAGES, ROUTE_PATH} from "../../config";
import ButtonWrapper from "../../components/ButtonWrapper";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
import FullPageLoader from "../../components/FullPageLoader";
import LogoBanner from "../../components/LogoBanner";

const IDS = {
	FIRST_NAME: "firstName",
	LAST_NAME: "lastName",
	EMAIL: "email",
	PASSWORD: "password",
	CONFIRM_PASSWORD: "confirmPassword"
}

const SignUp = props => {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorFields, setErrorFields] = useState([]);
	const [isPasswordMatching, setIsPasswordMatching] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(null);

	const navigate = useNavigate();

	const {loaders: {registerUserLoader}, actions: {registerUser}} = useUserContext();

	useEffect(() => {
			if (email)
				if (email.toLowerCase().match(EMAIL_REGEX)) {
					removeErrorFields(IDS.EMAIL);
					setIsEmailValid(true);
				} else {
					setIsEmailValid(false);
					setErrorFields(prevState => {
						(!prevState.includes(IDS.EMAIL)) && prevState.push(IDS.EMAIL);
						return [...prevState];
					});
				}
		},
		[email]
	);

	useEffect(() => {
		if (confirmPassword && password) {
			if (confirmPassword !== password) {
				setIsPasswordMatching(prevState => prevState ? false : prevState);
				addErrorFields(IDS.PASSWORD, IDS.CONFIRM_PASSWORD)
			} else {
				setIsPasswordMatching(prevState => !prevState ? true : prevState);
				removeErrorFields(IDS.PASSWORD, IDS.CONFIRM_PASSWORD)
			}
		}
	}, [confirmPassword, password])

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

	const requiredFields = useMemo(() => Object.values(IDS), []);

	const changeValue = useCallback((id, value, setter) => {
		removeErrorFields(id);
		setter(value);
	}, []);

	const onBackClick = useCallback(() => {
		navigate(-1);
	}, []);

	const validateData = useCallback((data) => {
		let isDataValid = true;
		const {confirmPassword, password, email} = data;
		requiredFields.forEach((field) => {
			if (!data?.[field]) {
				setErrorFields(prevState => {
					(!prevState.includes(field)) && prevState.push(field);
					return [...prevState];
				})
				isDataValid = false;
			}
		});
		if (isDataValid) {
			if (email.toLowerCase().match(EMAIL_REGEX)) {
				removeErrorFields(IDS.EMAIL);
				setIsEmailValid(true);
			} else {
				setIsEmailValid(false);
				setErrorFields(prevState => {
					(!prevState.includes(IDS.EMAIL)) && prevState.push(IDS.EMAIL);
					return [...prevState];
				});
				isDataValid = false;
			}
			if (confirmPassword !== password) {
				setIsPasswordMatching(prevState => prevState ? false : prevState);
				addErrorFields(IDS.PASSWORD, IDS.CONFIRM_PASSWORD);
				isDataValid = false;
			} else {
				setIsPasswordMatching(prevState => !prevState ? true : prevState);
				removeErrorFields(IDS.PASSWORD, IDS.CONFIRM_PASSWORD)
			}
		}
		return isDataValid;
	}, []);

	const onUserRegister = () => {
		const data = {firstName, lastName, email, password, confirmPassword}
		if (validateData(data)) {
			delete data.confirmPassword;
			const successCallback = () => {
				navigate(ROUTE_PATH.INDEX, {replace: true});
			};
			registerUser(data, successCallback);
		}
	}

	return <>
		<div className="signup-container">
			<LogoBanner width={"75%"}/>
			{registerUserLoader && <FullPageLoader message={"Creating your user, Hang Tight!"}/>}
			<InputController
				type={"text"}
				id={IDS.FIRST_NAME}
				label={"First Name"}
				placeholder={"Enter your First name"}
				required={requiredFields.includes(IDS.FIRST_NAME)}
				value={firstName}
				onChange={value => changeValue(IDS.FIRST_NAME, value, setFirstName)}
				isInvalid={errorFields.includes(IDS.FIRST_NAME)}
				invalidMessage={ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<InputController
				type={"text"}
				id={IDS.LAST_NAME}
				label={"Last Name"}
				placeholder={"Enter your Last name"}
				required={requiredFields.includes(IDS.LAST_NAME)}
				value={lastName}
				onChange={value => changeValue(IDS.LAST_NAME, value, setLastName)}
				isInvalid={errorFields.includes(IDS.LAST_NAME)}
				invalidMessage={ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<InputController
				type={"email"}
				id={IDS.EMAIL}
				label={"Email"}
				placeholder={"Enter your Email"}
				required={requiredFields.includes(IDS.EMAIL)}
				value={email}
				onChange={value => changeValue(IDS.EMAIL, value, setEmail)}
				isInvalid={errorFields.includes(IDS.EMAIL)}
				invalidMessage={!isEmailValid ? ERROR_MESSAGES.EMAIL_FORMAT_INVALID : ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<InputController
				type={"password"}
				id={IDS.PASSWORD}
				label={"Password"}
				placeholder={"Enter Password"}
				required={requiredFields.includes(IDS.PASSWORD)}
				value={password}
				onChange={value => changeValue(IDS.PASSWORD, value, setPassword)}
				isInvalid={errorFields.includes(IDS.PASSWORD)}
				invalidMessage={!isPasswordMatching ? ERROR_MESSAGES.PASSWORD_NOT_MATCHING : ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<InputController
				type={"password"}
				id={IDS.CONFIRM_PASSWORD}
				label={"Confirm Password"}
				placeholder={"Enter Confirm Password"}
				required={requiredFields.includes(IDS.CONFIRM_PASSWORD)}
				value={confirmPassword}
				onChange={value => changeValue(IDS.CONFIRM_PASSWORD, value, setConfirmPassword)}
				isInvalid={errorFields.includes(IDS.CONFIRM_PASSWORD)}
				invalidMessage={!isPasswordMatching ? ERROR_MESSAGES.PASSWORD_NOT_MATCHING : ERROR_MESSAGES.REQUIRED_FIELD}
			/>

			<div className="action-btn-container">
				<ButtonWrapper variant={"outline-secondary"} onClick={onBackClick}>Back</ButtonWrapper>
				<ButtonWrapper onClick={onUserRegister}>Sign Up</ButtonWrapper>
			</div>
		</div>
	</>
};

SignUp.propTypes = {
	props: PropTypes.object
};
SignUp.defaultProps = {
	props: {}
};

export default SignUp
