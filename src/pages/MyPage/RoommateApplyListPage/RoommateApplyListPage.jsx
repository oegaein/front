import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

import Header from '@common/header/Header';
import RoommateScrollList from '@common/RoommateScrollList';
import DeliveryNotification from '@common/ui/item/DeliveryNotification';
import SelectMenuBar from '@common/menu/SelectMenuBar';
const RoommateApplyListPage = () => {
	const [uploadPostType, setUploadPostType] = useState('룸메이트');

	return (
		<SettingStyle className="bg-white">
			<div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span className="header">내가 신청한 룸메이트</span>
				</Header>
			</div>
			<div>
				<SelectMenuBar
					menuList={['룸메이트', '공동배달']}
					pickedMenuId={setUploadPostType}
				/>
				{uploadPostType === '룸메이트' ? (
					<RoommateScrollList type="my-matchingrequests" />
				) : (
					<div className="flex justify-center items-center w-full p-6">
						<DeliveryNotification />
					</div>
				)}
			</div>
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
