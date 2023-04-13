import React, {useEffect, useRef} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {createPortal} from "react-dom";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useUserContext} from "../../context/UserContext";
import {getUserDetailsLS} from "../../services/localStorage";

const MediaPlayer = ({
	                     isShown,
	                     onClose,
	                     id,
	                     mediaUrl
                     }) => {

	const audioPlayerRef = useRef(undefined);
	const {rollbackSeconds} = getUserDetailsLS();

	useEffect(
		() => {
			if (isShown)
				playMedia();
		},
		[isShown]
	);

	const playMedia = () => {
		audioPlayerRef.current.play();
	}
	const pauseMedia = () => {
		audioPlayerRef.current.pause();
	}
	const seekMedia = (seekSeconds = 10, toBeginning = false) => {
		audioPlayerRef.current.currentTime -= toBeginning ? audioPlayerRef.current.currentTime : seekSeconds;
	}
	const handleClose = (e) => {
		e.stopPropagation();
		onClose();
		seekMedia(undefined, true)
		pauseMedia();
	};

	const onPlayerWrapperClick = () => {
		if (audioPlayerRef.current.paused) {
			playMedia()
		} else {
			pauseMedia();
		}
	}
	const onPlayerWrapperDoubleClick = () => {
		seekMedia(rollbackSeconds);
	}

	return <>
		<div
			className={`media-player-container ${isShown ? "visible" : "invisible"}`}
			key={id}
			id={id}
			onClick={onPlayerWrapperClick}
			onDoubleClick={onPlayerWrapperDoubleClick}
		>
			<div id="close-btn" className="close" onClick={handleClose}>
				<FontAwesomeIcon icon={faCircleXmark} size={"2x"}/>
			</div>
			<div className="player">
				<audio src={mediaUrl} controls ref={audioPlayerRef} preload="auto"/>
			</div>
			<div className="instructions-container">
				<h3>How to operate this screen?</h3>
				<ul>
					<li>Press close button at the top to close this player</li>
					<li>Click anywhere on this screen to toggle play and pause</li>
					<li>Double click to seek back 10 seconds</li>
				</ul>
			</div>
		</div>
	</>
};

MediaPlayer.propTypes = {
	isShown: PropTypes.bool,
	onClose: PropTypes.func,
	id: PropTypes.string.isRequired,
	mediaUrl: PropTypes.string.isRequired
};
MediaPlayer.defaultProps = {
	isShown: false,
	onClose: () => {
	}
};

export default props => createPortal(<MediaPlayer {...props}/>, document.getElementById("modal"))
