import React, {useCallback, useEffect, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {faICursor, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const INITIAL_STATE = {
	clickCoordinates: {x: 0, y: 0},
	showContextMenu: false
}
const MediaContextMenu = ({
	                          containerRef,
	                          onRename,
	                          onDelete
                          }) => {

	const [showContextMenu, setShowContextMenu] = useState(INITIAL_STATE.showContextMenu);
	const [clickCoordinates, setClickCoordinates] = useState(INITIAL_STATE.clickCoordinates);


	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
			document.addEventListener("click", handleClickOutside);
			document.removeEventListener("contextmenu", handleContextMenu);
		};
	});

	const handleClickOutside = useCallback(() => {
		showContextMenu && setShowContextMenu(false);
	}, [showContextMenu]);

	const handleContextMenu = useCallback((e) => {
		if (containerRef.current.contains(e.target)) {
			console.log("containerRef.contains(e.target)", containerRef.current.contains(e.target))
			console.log("e", e);
			const {offsetX, pageX, offsetY, pageY, layerX, layerY} = e;
			setClickCoordinates({x: pageX, y: pageY})
			setShowContextMenu(true)
		} else {
			setShowContextMenu(INITIAL_STATE.showContextMenu);
			setClickCoordinates(INITIAL_STATE.clickCoordinates)
		}
	}, [])

	const onMenuItemClick = (event, action) => {
		event.stopPropagation();
		handleClickOutside();
		if (action === "rename")
			onRename();
		else if (action === "delete")
			onDelete();
	}

	return <>
		{
			showContextMenu &&
			<div
				className="media-context-menu-container"
				style={{top: `${clickCoordinates.y}px`, left: `${clickCoordinates.x}px`}}
			>
				<ul className="media-context-menu">
					<li onClick={(e) => onMenuItemClick(e, 'rename')} id={"rename"}>
						<FontAwesomeIcon icon={faICursor} className={"icon rename-icon"}/>
						<span className="menu-text"> Rename </span>
					</li>
					<li onClick={(e) => onMenuItemClick(e, 'delete')} id={"delete"}>
						<FontAwesomeIcon icon={faTrash} className={"icon delete-icon"}/>
						<span className="menu-text"> Delete </span>
					</li>
				</ul>
			</div>
		}
	</>
};

MediaContextMenu.propTypes = {
	containerRef: PropTypes.element.isRequired
};
MediaContextMenu.defaultProps = {};

export default MediaContextMenu
