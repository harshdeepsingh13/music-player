import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import UnderDevelopment from "../../components/UnderDevelopment";
import {useAuthenticationContext} from "../../context/AuthenticationContext";

const Home = props => {

	const {isAuthorized} = useAuthenticationContext();

	return <>
		<UnderDevelopment isLoggedIn={isAuthorized}/>
	</>
};

Home.propTypes = {
	props: PropTypes.object
};
Home.defaultProps = {
	props: {}
};

export default Home
