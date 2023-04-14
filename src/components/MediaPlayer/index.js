import React, {useEffect, useRef} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {createPortal} from "react-dom";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getUserDetailsLS} from "../../services/localStorage";
import useLongClick from "../hooks/useLongClick";

const MediaPlayer = ({
	                     isShown,
	                     onClose,
	                     id,
	                     mediaUrl
                     }) => {

	const audioPlayerRef = useRef(undefined);
	const {rollbackSeconds} = getUserDetailsLS();

	const seekMedia = (seekSeconds = 10, toBeginning = false) => {
		audioPlayerRef.current.currentTime -= toBeginning ? audioPlayerRef.current.currentTime : seekSeconds;
	}

	const playMedia = () => {
		audioPlayerRef.current.play();
	}
	const pauseMedia = () => {
		audioPlayerRef.current.pause();
	}

	const onPlayerWrapperClick = () => {
		if (audioPlayerRef.current.paused) {
			playMedia()
		} else {
			pauseMedia();
		}
	}

	const longClickEvents = useLongClick({
		threshold: 500,
		thresholdBetweenIterations: 1000,
		onStart: () => pauseMedia(),
		whileClick: () => seekMedia(rollbackSeconds),
		onFinish: () => playMedia(),
		normalClick: onPlayerWrapperClick
	});

	useEffect(
		() => {
			if (isShown)
				playMedia();
		},
		[isShown]
	);
	const handleClose = (e) => {
		e.stopPropagation();
		onClose();
		seekMedia(undefined, true)
		pauseMedia();
	};

	return <>
		<div
			className={`media-player-container ${isShown ? "visible" : "invisible"}`}
			key={id}
			id={id}
			{...longClickEvents}
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
					<li>Long Click anywhere for about 500ms to seek back {rollbackSeconds} seconds</li>
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
