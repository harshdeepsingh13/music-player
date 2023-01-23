import React from 'react';
import {Navigate} from 'react-router-dom';
import {ROUTE_PATH} from "../../config";
import {Container} from "react-bootstrap";
import {useAuthenticationContext} from "../../context/AuthenticationContext";

const RouteWrapper = ({children, isPrivate}) => {

	const {isAuthorized} = useAuthenticationContext();

	return isPrivate ?
		<>
			{isAuthorized ? <PrivateRoute>{children}</PrivateRoute> : <Navigate to={ROUTE_PATH.SIGNIN}/>}
		</> :
		<>
			{!isAuthorized ? <Container>{children}</Container> : <Navigate to={ROUTE_PATH.INDEX}/>}
		</>
};

RouteWrapper.propTypes = {};
RouteWrapper.defaultProps = {};

const PrivateRoute = ({children}) => {

	return <>

		<Container>
			{children}
		</Container>

	</>
}

export default RouteWrapper
