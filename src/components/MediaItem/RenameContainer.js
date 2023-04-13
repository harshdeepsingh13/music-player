import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ButtonWrapper from "../ButtonWrapper";

const RenameContainer = ({
	                         originalFileName,
	                         onCancel,
	                         onRename
                         }) => {

	const [mediaName, setMediaName] = useState(originalFileName);

	return <>
		<div className="rename-container">
			<input
				autoFocus
				type="text"
				id="media-name"
				name="media-name"
				className="rename-input"
				value={mediaName}
				onChange={({target: {value}}) => setMediaName(value)}
				onKeyDown={({key}) => {
					if (key === "Enter") onRename(mediaName)
					if (key === "Escape") onCancel();
				}}
			/>
			<div className="rename-actions">
				<ButtonWrapper
					variant={"danger"}
					onClick={onCancel}
				>
					Cancel
				</ButtonWrapper>
				<ButtonWrapper
					variant={"success"}
					onClick={() => onRename(mediaName)}
				>
					Rename
				</ButtonWrapper>
			</div>
		</div>
	</>
};

RenameContainer.propTypes = {
	originalFileName: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired,
	onRename: PropTypes.func.isRequired
};
RenameContainer.defaultProps = {};

export default RenameContainer
