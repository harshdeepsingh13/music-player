import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import LogoBannerImage from "../../assets/images/logo-banner.png"

const LogoBanner = ({width}) => {
	return <>
		<div className="logo-banner-container">
		<img
			src={LogoBannerImage}
			alt="Unconventional Player Logo" className={"logo-banner"}
			style={{width}}
		/>
		</div>
	</>
};

LogoBanner.propTypes = {
	width: PropTypes.string
};
LogoBanner.defaultProps = {
	width: "100%"
};

export default LogoBanner
