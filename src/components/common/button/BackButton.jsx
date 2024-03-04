import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackIcon from '@assets/images/common/BackIcon.svg';

const BackButton = ({ backPath, eventName }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		if (backPath) {
			navigate(-1);
		} else {
			if (eventName) {
				eventName(e);
			}
		}
	};

	return (
		<>
			<div className="flex justify-start w-full mb-[30px]">
				<button onClick={handleClick}>
					<img src={BackIcon} />
				</button>
			</div>
		</>
	);
};

export default BackButton;

BackButton.propTypes = {
	backPath: PropTypes.bool.isRequired,
	eventName: PropTypes.func,
};
