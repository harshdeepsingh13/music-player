import React, {useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {uploadAudio} from "../../services/cloudinary";

const UploadNewAudio = props => {

	const [file, setFile] = useState();

	return <>
		<div className="uploadNewAudioContainer">
			<input
                type="file"
                name="file"
                id="file"
                onChange={({target: {files}}) => setFile(files[0])}/>
			<input type="button" value="submit" onClick={() => uploadAudio(file)}/>
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
