import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Form, InputGroup} from "react-bootstrap";

const InputController = ({
	                         id,
	                         label,
	                         type,
	                         as,
	                         placeholder,
	                         value,
	                         maxLength,
	                         disabled,
	                         postFixText,
	                         preFixText,
	                         required,
	                         onChange,
	                         onKeyDown,
	                         isInvalid,
	                         invalidMessage
                         }) => {

	const handleChange = ({target: {value}}) => {
		if (maxLength && value.length <= maxLength)
			onChange(value);
		else if (!maxLength)
			onChange(value)
	}

	const handleKeyPress = (event) => {
		onKeyDown(event);
	}

	return <>
		<div className="input-controller-container">
			<Form.Group controlId={id}>
				<Form.Label>{label} {required && <span className="required">*</span>}</Form.Label>
				<InputGroup>
					{
						preFixText &&
						<InputGroup.Text>{preFixText}</InputGroup.Text>
					}
					<Form.Control
						type={type}
						as={as}
						placeholder={placeholder}
						value={value}
						disabled={disabled}
						aria-disabled={disabled}
						aria-required={required}
						onChange={handleChange}
						onKeyDown={handleKeyPress}
						isInvalid={isInvalid}
					/>
					{
						postFixText &&
						<InputGroup.Text>{postFixText}</InputGroup.Text>
					}
					{
						isInvalid && <Form.Control.Feedback type="invalid">
							{invalidMessage}
						</Form.Control.Feedback>
					}
				</InputGroup>
			</Form.Group>
		</div>
	</>
};

const SelectController = ({
	                          id,
	                          label,
	                          type,
	                          placeholder,
	                          value,
	                          disabled,
	                          required,
	                          onChange,
	                          children
                          }) => {

	const handleChange = ({target: {value}}) => {
		onChange(value)
	}

	return <>
		<div className="input-controller-container">
			<Form.Group controlId={id}>
				<Form.Label>{label}{required && <span className="required">*</span>}</Form.Label>
				<Form.Select
					type={type}
					placeholder={placeholder}
					value={value}
					disabled={disabled}
					aria-disabled={disabled}
					required={required}
					aria-required={required}
					onChange={handleChange}
				>
					{children}
				</Form.Select>
			</Form.Group>
		</div>
	</>
}

const componentPropTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	as: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	maxLength: PropTypes.number,
	postFixText: PropTypes.string,
	preFixText: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	isInvalid: PropTypes.bool,
	invalidMessage: PropTypes.string,
};
const componentDefaultProps = {
	label: "Label",
	type: "text",
	placeholder: "Placeholder",
	value: "",
	maxLength: null,
	disabled: false,
	required: false,
	isInvalid: false,
	onChange: () => {
	},
	onKeyDown: () => {
	}
}

InputController.propTypes = componentPropTypes;
InputController.defaultProps = componentDefaultProps;
SelectController.prototype = componentPropTypes;
SelectController.defaultProps = componentDefaultProps;

export {SelectController}

export default React.memo(InputController, (prevProps, nextProps) => (prevProps.value === nextProps.value) && (prevProps.isInvalid === nextProps.isInvalid) && (prevProps.invalidMessage === nextProps.invalidMessage));

