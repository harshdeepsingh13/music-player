import React from 'react';
import './App.scss';
import PropTypes from 'prop-types';
import AppRouter from "./AppRouter";

const App = props => {
	return <>
		<AppRouter/>
	</>
};

App.propTypes = {
	props: PropTypes.object
};
App.defaultProps = {
	props: {}
};

export default App
