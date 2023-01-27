import React from 'react';
import {Navigate} from 'react-router-dom';
import {ROUTE_PATH} from "../../config";
import {Container} from "react-bootstrap";
import {useAuthenticationContext} from "../../context/AuthenticationContext";
import PropTypes from "prop-types";
import Header from "../Header";

const RouteWrapper = ({children, isPrivate, isHeader}) => {

	const {isAuthorized} = useAuthenticationContext();

	return <>
		{isHeader && <Header/>}
		{
			isPrivate ?
				<>
					{isAuthorized ? <PrivateRoute>{children}</PrivateRoute> : <Navigate to={ROUTE_PATH.SIGNIN}/>}
				</> :
				<>
					{!isAuthorized ? <Container>{children}</Container> : <Navigate to={ROUTE_PATH.INDEX}/>}
				</>
		}
	</>
};

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	isHeader: PropTypes.bool
};
RouteWrapper.defaultProps = {
	isPrivate: false,
	isHeader: false
};

const PrivateRoute = ({children}) => {

	return <>

		<Container>
			{children}
		</Container>

	</>
}

export default RouteWrapper
