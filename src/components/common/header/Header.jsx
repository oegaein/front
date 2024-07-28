import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackIcon from '@assets/images/common/BackIcon.svg';
import BackIconWhite from '@assets/images/common/BackIconWhite.svg';
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
	const location = useLocation();

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

	const isUserProfile =
		/^\/user\/\d+$/.test(location.pathname) ||
		location.pathname === '/user/my-profile';

	return (
		<>
			<div
				className={'flex flex-1 justify-between w-full h-[57px] items-center'}
			>
				<button className={'flex-1'} onClick={handleBackButton}>
					<img src={`${isUserProfile ? BackIconWhite : BackIcon}`} />
				</button>
				<div
					className={`${location.pathname.substring(0, 12) === '/post-detail' ? 'flex-[10]' : 'flex-[2.6]'}`}
				>
					{children && children}
				</div>
				{rightEvent &&
					(rightContent.length >= 10 ? (
						<div className="flex flex-1 justify-end">
							<img
								className="object-none"
								onClick={handleRightButton}
								src={rightContent}
								alt="rightBtn"
							/>
						</div>
					) : (
						<div className="flex flex-1 justify-end">
							<SkipBtn onClick={handleRightButton}>{rightContent}</SkipBtn>
						</div>
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
