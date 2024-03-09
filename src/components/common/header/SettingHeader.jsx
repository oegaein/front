import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackIcon from '@assets/images/common/BackIcon.svg';

const SettingHeader = ({ backPath, eventName, rightBtn }) => {
	const navigate = useNavigate();

	const handleBackButton = (e) => {
		if (backPath) {
			navigate(-1);
		} else {
			if (eventName) {
				eventName(e);
			}
		}
	};

	const handleRightButton = (e) => {
		if (eventName) {
			rightBtn(e);
		}
	};
	return (
		<>
			<div className="flex justify-between w-full mb-[30px]">
				<button onClick={handleBackButton}>
					<img src={BackIcon} />
				</button>
				{rightBtn && <button onClick={handleRightButton}></button>}
			</div>
		</>
	);
};

export default SettingHeader;

SettingHeader.propTypes = {
	backPath: PropTypes.bool.isRequired,
	eventName: PropTypes.func,
	rightBtn: PropTypes.func,
};
