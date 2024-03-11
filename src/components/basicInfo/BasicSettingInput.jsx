import React, { useState } from 'react';
import PropTypes from 'prop-types';

//
export const BasicInput = ({ onChangeValue, limitNum }) => {
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		const inputValue = e.target.value;
		if (inputValue.length <= limitNum) {
			setValue(inputValue);
			onChangeValue(inputValue);
		}
	};

	return (
		<>
			<input
				className="w-full pl-[15px] pb-[11px] border-b border-solid border-[#DEDEDE] focus:outline-none"
				type="text"
				value={value}
				onChange={handleChange}
			/>
		</>
	);
};

BasicInput.propTypes = {
	onChangeValue: PropTypes.func.isRequired,
};

//
export const NumInput = () => {
	return (
		<>
			<div>NumInput</div>
		</>
	);
};

//
export const RadioInput = () => {
	return (
		<>
			<div>RadioInput</div>
		</>
	);
};

//
export const CheckboxInput = () => {
	return (
		<>
			<div>CheckboxInput</div>
		</>
	);
};
