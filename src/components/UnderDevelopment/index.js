import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {ROUTE_PATH} from "../../config";
import {useAuthenticationContext} from "../../context/AuthenticationContext";

const UnderDevelopment = ({isLoggedIn}) => {

	const {logoutUser} = useAuthenticationContext();

	return <>
		<div style={{textAlign: "center"}}>
			<h2>Under development</h2>
			<p>Is logged in?: {isLoggedIn.toString()}</p>
			<p>{isLoggedIn && <button onClick={logoutUser}>Logout</button>}</p>
			<h6>Quick Links</h6>
			<p><Link to={ROUTE_PATH.INDEX}>Home Page</Link></p>
			<p><Link to={ROUTE_PATH.SIGNIN}>SignIn</Link></p>
			<p><Link to={ROUTE_PATH.SIGNUP}>SignUp</Link></p>
		</div>
	</>
};

UnderDevelopment.propTypes = {
	props: PropTypes.object
};
UnderDevelopment.defaultProps = {
	props: {}
};

export default UnderDevelopment
