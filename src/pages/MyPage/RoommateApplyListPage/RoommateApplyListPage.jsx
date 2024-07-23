import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

import Header from '@common/header/Header';
import RoommateScrollList from '@common/RoommateScrollList';
const RoommateApplyListPage = () => {
	const [uploadPostType, setUploadPostType] = useState('roommate');
	const handleChangeType = (type) => {
		//api 요청 로직
		setUploadPostType(type);
	};
	return (
		<SettingStyle className="bg-white">
			<div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span className="header">내 룸메이트 신청 목록</span>
				</Header>
			</div>
			<div>
				<div className="flex">
					<div
						onClick={() => handleChangeType('roommate')}
						className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}
					>
						룸메이트
					</div>
					{/* <div onClick={()=>handleChangeType('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div> */}
				</div>
			</div>
			<RoommateScrollList type="my-matchingrequests" />
		</SettingStyle>
	);
};

export default RoommateApplyListPage;

const SettingStyle = styled.main`
	.header {
		font: ${FONT.title3B19};
	}
	.username {
		font-size: ${FONT.caption2M14};
	}
	.heading-text {
		font-size: ${FONT.title4SB17};
	}
	.small-text {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray600};
	}

	.notification-title {
		flex: 1;
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
		border-bottom: 2px solid ${COLOR.gray100};
		padding-bottom: 16px;
		cursor: pointer;
		&:hover {
			border-bottom: 2px solid ${COLOR.purple1};
			color: black;
		}
	}
	.selected-title {
		border-bottom: 2px solid ${COLOR.purple1};
		color: black;
	}
	.noresults {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}
	.likelist {
		background-color: ${COLOR.gray100};
	}
`;
