import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UploadNewAudio = ({uploadMedia}) => {

	return <>
		<div className="upload-new-audio-controller">
			<label htmlFor="file">
				<FontAwesomeIcon icon={faUpload}/>
				Upload a Audio
			</label>
			<input
				type="file"
				name="file"
				id="file"
				onChange={({target: {files}}) => uploadMedia(files[0])}
				accept={".mp3"}
			/>
			<input type="button" value="submit"/>
		</div>
	</>
};

UploadNewAudio.propTypes = {
	props: PropTypes.object
};
UploadNewAudio.defaultProps = {
	props: {}
};

export default UploadNewAudio
