import React, {useEffect} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {LOADER_ORIENTATION} from "../../config";
import Loader from "../Loader";

const FullPageLoader = ({message}) => {

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		}
	}, []);

	return <>
		<div className="full-page-loader-container">
			<Loader orientation={LOADER_ORIENTATION.VERTICAL} message={message}/>
		</div>
	</>
};

FullPageLoader.propTypes = {
	props: PropTypes.object
};
FullPageLoader.defaultProps = {
	props: {}
};

export default FullPageLoader
