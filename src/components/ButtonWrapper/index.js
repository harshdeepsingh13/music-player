import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

const ButtonWrapper = ({variant, onClick, children}) => {
	return <>
		<Button variant={variant} onClick={onClick}>
			{children}
		</Button>
	</>
};

ButtonWrapper.propTypes = {
	variant: PropTypes.oneOf(["primary", "outline-primary", "secondary", "outline-secondary", "success", "outline-success", "warning", "outline-warning", "danger", "outline-danger", "info", "outline-info", "light", "outline-light", "dark", "outline-dark", "link"]),
	onClick: PropTypes.func
};
ButtonWrapper.defaultProps = {
	variant: "primary",
	onClick: () => {
	}
};

export default ButtonWrapper
