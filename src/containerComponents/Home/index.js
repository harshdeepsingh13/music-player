import React, {useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import UnderDevelopment from "../../components/UnderDevelopment";
import {useAuthenticationContext} from "../../context/AuthenticationContext";
import {uploadAudio} from "../../services/cloudinary";
import UploadNewAudio from "../../components/UploadNewAudio";
import AllMedia from "../../components/AllMedia";

const Home = props => {

	const {isAuthorized} = useAuthenticationContext();

	return <>
		<UploadNewAudio/>
		<AllMedia/>
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
