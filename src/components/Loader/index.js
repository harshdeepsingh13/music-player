import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Spinner} from "react-bootstrap";
import {LOADER_ORIENTATION} from "../../config";

const Loader = ({message, orientation, color, variant}) => {
	return <div className={`loader-container ${orientation} ${variant}`}>
		<Spinner className={`loader ${color}`} animation={'grow'}/>
		{message && <span className="loader-message">{message}</span>}
	</div>
};

Loader.propTypes = {
	message: PropTypes.string,
	orientation: PropTypes.oneOf([LOADER_ORIENTATION.HORIZONTAL, LOADER_ORIENTATION.VERTICAL]),
	color: PropTypes.oneOf(["blue", 'pink']),
	variant: PropTypes.oneOf(["light", "dark"])
};
Loader.defaultProps = {
	message: "",
	orientation: LOADER_ORIENTATION.HORIZONTAL,
	color: "blue",
	variant: "light"
};

export default Loader
