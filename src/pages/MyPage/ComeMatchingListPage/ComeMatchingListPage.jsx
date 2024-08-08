import React, { useState } from 'react';
import { useMatchingPosts } from '@hooks/useMatchingPosts';
import { Link } from 'react-router-dom';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

//components
import Header from '@common/header/Header';
import ComeMatchingRequest from '@common/ui/item/ComeMatchingRequest';
import DeliveryNotification from '@common/ui/item/DeliveryNotification';
import SelectMenuBar from '@common/menu/SelectMenuBar';

const ComeMatchingListPage = () => {
	const [uploadPostType, setUploadPostType] = useState('룸메이트');
	const {
		data: comeMatchingRequests,
		refetch: reFetchComeMatchingRequests,
		isLoading: isLoadingCome,
		error: isErrorCome,
	} = useMatchingPosts('come-matchingrequests');

	if (isLoadingCome) {
		return <div>로딩중</div>;
	}
	return (
		<SettingStyle className="bg-white">
			<div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span className="header">내게 온 룸메이트 신청</span>
				</Header>
			</div>
			<div>
				<SelectMenuBar
					menuList={['룸메이트', '공동배달']}
					pickedMenuId={setUploadPostType}
				/>
				{uploadPostType === '룸메이트' ? (
					<div className="flex flex-col gap-[10px] px-[25px] mt-[16px]">
						{comeMatchingRequests?.data?.length > 0 ? (
							comeMatchingRequests.data
								.slice(0, 3)
								.map((post, index) => (
									<ComeMatchingRequest
										post={post}
										index={index}
										reFetchComeMatchingRequests={reFetchComeMatchingRequests}
									/>
								))
						) : (
							<div className="text-center">나에게 온 신청 요청이 없습니다.</div>
						)}
					</div>
				) : (
					<div className="flex justify-center items-center w-full p-6">
						<DeliveryNotification />
					</div>
				)}
			</div>
		</SettingStyle>
	);
};

export default ComeMatchingListPage;

const SettingStyle = styled.main`
	.header {
		font: ${FONT.title3B19};
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
`;
