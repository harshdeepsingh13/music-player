import React, {useRef, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import MediaPlayer from "../MediaPlayer";
import {Card} from "react-bootstrap";
import musicBanner from '../../assets/images/media.jpg'
import playOverlay from "../../assets/images/circle-play-solid.svg"
import MediaContextMenu from "../MediaContextMenu";
import Loader from "../Loader";
import RenameContainer from "./RenameContainer";

const MediaItem = ({
	                   id,
	                   fullUrl,
	                   originalFileName,
	                   handleDelete,
	                   handleRename: handleRenameFromProps,
	                   isActionLoader
                   }) => {

	const [isPlayerShown, setIsPlayerShown] = useState(false);
	const [isRenameState, setIsRenameState] = useState(false);

	const containerRef = useRef(undefined);

	const onMediaClick = () => {
		setIsPlayerShown(true);
	}
	const handleMediaPlayerClose = () => {
		setIsPlayerShown(false);
	}

	const onContextMenu = (event) => {
		event.preventDefault();
	}

	const onRenameClick = () => {
		setIsRenameState(true);
	}

	const handleRename = (newName) => {
		const successCallback = () => setIsRenameState(false);
		handleRenameFromProps(id, newName, successCallback);
	}

	const onCancelRenameClick = () => {
		setIsRenameState(false);
	}

	return <>
		<MediaPlayer
			isShown={isPlayerShown}
			onClose={handleMediaPlayerClose}
			id={id}
			mediaUrl={fullUrl}
		/>
		<div
			className={`media-item-container ${isActionLoader && "disabled"}`}
			key={id}
			onClick={!isRenameState && onMediaClick}
			onContextMenu={onContextMenu}
			ref={containerRef}
		>
			{
				isActionLoader &&
				<div className="media-item-loader-container">
					<Loader variant={"dark"}/>
				</div>
			}
			{
				!isRenameState &&
				<MediaContextMenu
					containerRef={containerRef}
					onRename={onRenameClick}
					onDelete={() => handleDelete(id, originalFileName)}
				/>
			}
			<Card>
				{
					!isRenameState &&
					<div className="card-overlay">
						<img src={playOverlay} alt=""/>
					</div>
				}
				<Card.Img variant="top" src={musicBanner}/>
				<Card.ImgOverlay>
					<Card.Title>
						{
							isRenameState ?
								<RenameContainer
									originalFileName={originalFileName}
									onCancel={onCancelRenameClick}
									onRename={handleRename}
								/> :
								originalFileName
						}
					</Card.Title>
				</Card.ImgOverlay>
			</Card>
		</div>
	</>
};

MediaItem.propTypes = {
	id: PropTypes.string.isRequired,
	fullUrl: PropTypes.string.isRequired,
	originalFileName: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired
};
MediaItem.defaultProps = {};

export default MediaItem
