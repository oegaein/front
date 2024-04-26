import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackIcon from '@assets/images/common/BackIcon.svg';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

const Header = ({
	backPath,
	backEvent,
	rightContent,
	rightEvent,
	children,
}) => {
	const navigate = useNavigate();

	const handleBackButton = (e) => {
		if (backPath) {
			navigate(-1);
		} else {
			if (backEvent) {
				backEvent(e);
			}
		}
	};

	const handleRightButton = (e) => {
		if (rightEvent) {
			rightEvent(e);
		}
	};
	return (
		<>
			<div className="bg-white flex justify-between w-full h-[50px] items-center">
				<button onClick={handleBackButton}>
					<img src={BackIcon} />
				</button>
				{children && children}
				{rightEvent &&
					(rightContent.length >= 10 ? (
						<img
							onClick={handleRightButton}
							src={rightContent}
							alt="rightBtn"
						/>
					) : (
						<SkipBtn onClick={handleRightButton}>{rightContent}</SkipBtn>
					))}
			</div>
		</>
	);
};

export default Header;

Header.propTypes = {
	backPath: PropTypes.string,
	backEvent: PropTypes.func,
	rightContent: PropTypes.string,
	rightEvent: PropTypes.func,
	children: PropTypes.node,
};

const SkipBtn = styled.button`
	font: ${FONT.body5M15};
	color: ${COLOR.purple1};
`;
