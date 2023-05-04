import React, {useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import UnderDevelopment from "../../components/UnderDevelopment";
import {useAuthenticationContext} from "../../context/AuthenticationContext";
import {uploadAudio} from "../../services/cloudinary";
import UploadNewAudio from "../../components/UploadNewAudio";
import AllMedia from "../../components/AllMedia";
import {useMediaContext} from "../../context/MediaContext";
import FullPageLoader from "../../components/FullPageLoader";

const Home = props => {

	const {loaders, actions} = useMediaContext();
	const {uploadMediaLoader} = loaders;
	const {uploadMedia} = actions;

	return <>
		{
			uploadMediaLoader && <FullPageLoader message={"Uploading Audio"} />
		}
		<UploadNewAudio uploadMedia={uploadMedia}/>
		<AllMedia/>
	</>
};

Home.propTypes = {
	props: PropTypes.object
};
Home.defaultProps = {
	props: {}
};

export default Home
