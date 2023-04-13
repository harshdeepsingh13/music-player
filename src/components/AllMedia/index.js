import React, {useEffect, useRef} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {useMediaContext} from "../../context/MediaContext";
import FullPageLoader from "../FullPageLoader";
import MediaItem from "../MediaItem";

const AllMedia = props => {

	let isMounted = useRef(false);

	const {state, loaders, actions} = useMediaContext();

	const {media} = state;
	const {fetchMediaLoader, mediaActionsLoader} = loaders;
	const {fetchMedia, deleteMedia, renameMedia} = actions;

	useEffect(() => {
		if (!isMounted.current) {
			fetchMedia();
			isMounted.current = true;
		}
	}, []);

	const handleDelete = (id, originalFileName) => {
		if (window.confirm(`Are you sure you want to delete ${originalFileName}?`)) {
			const successCallback = () => {
				fetchMedia();
			};
			deleteMedia(id, successCallback);
		}
	}

	const handleRename = (id, newName, successCallback) => {
		renameMedia(id, newName, successCallback)
	}


	return <>
		{fetchMediaLoader && <FullPageLoader message={"Getting your media!"}/>}
		{JSON.stringify(mediaActionsLoader, null, 2)}
		<div className="all-media-container">
			{
				media.map(item => <MediaItem
					key={item._id}
					id={item._id}
					fullUrl={item.fullUrl}
					originalFileName={item.originalFileName}
					handleDelete={handleDelete}
					handleRename={handleRename}
					isActionLoader={mediaActionsLoader.loader && mediaActionsLoader.ids.includes(item._id)}
				/>)
			}
		</div>
	</>
};

AllMedia.propTypes = {
	props: PropTypes.object
};
AllMedia.defaultProps = {
	props: {}
};

export default AllMedia
