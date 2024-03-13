import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackIcon from '@assets/images/common/BackIcon.svg';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

const Header = ({ backPath, eventName, rightBtn }) => {
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
				{rightBtn && <SkipBtn onClick={handleRightButton}>SKIP</SkipBtn>}
			</div>
		</>
	);
};

export default Header;

Header.propTypes = {
	backPath: PropTypes.bool.isRequired,
	eventName: PropTypes.func,
	rightBtn: PropTypes.func,
};

const SkipBtn = styled.button`
	font: ${FONT.body5M15};
	color: ${COLOR.purple1};
`;