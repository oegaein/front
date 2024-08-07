import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMatchingPosts } from 'hooks/useMatchingPosts';

//components
import Header from '@common/header/Header';
import Pagination from '@common/Pagination';
import MyPost from '@common/ui/item/MyPost';
import ConfirmModal from '@common/modal/ConfirmModal';
import OptionModal from '@common/modal/OptionModal';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import DeliveryNotification from '@common/ui/item/DeliveryNotification';
import SelectMenuBar from '@common/menu/SelectMenuBar';

const MyPostPage = () => {
	const [uploadPostType, setUploadPostType] = useState('룸메이트');
	const [currentPage, setCurrentPage] = useState(0);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({});
	const [option, setOption] = useState(false);
	const [optionModalOptions, setOptionModalOptions] = useState({});

	const {
		data: myMatchingPosts,
		isLoading: isLoadingMyUpload,
		error: isErrorMyUpload,
	} = useMatchingPosts('mypost', currentPage);

	if (isLoadingMyUpload) {
		return <div>로딩중</div>;
	}
	return (
		<SettingStyle className="bg-white pb-[24px]">
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			{option && (
				<OptionModal
					options={optionModalOptions}
					isOpen={option}
					setIsOpen={setOption}
				/>
			)}
			<div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span className="header">내가 올린 글</span>
				</Header>
			</div>
			<div>
				<SelectMenuBar
					menuList={['룸메이트', '공동배달']}
					pickedMenuId={setUploadPostType}
				/>
				{uploadPostType === '룸메이트' ? (
					<>
						<div className="flex flex-col gap-[10px] px-[25px] mt-[16px]">
							{myMatchingPosts?.data?.length > 0 ? (
								myMatchingPosts.data.map((post, index) => (
									<MyPost
										post={post}
										index={index}
										setConfirm={setConfirm}
										setConfirmContent={setConfirmContent}
										setOption={setOption}
										setOptionModalOptions={setOptionModalOptions}
									/>
								))
							) : (
								<NoResults />
							)}
						</div>
						<Pagination
							data={myMatchingPosts}
							setCurrentPage={setCurrentPage}
						/>
					</>
				) : (
					<div className="flex justify-center items-center w-full p-6">
						<DeliveryNotification />
					</div>
				)}
			</div>
		</SettingStyle>
	);
};

export default MyPostPage;

const NoResults = () => {
	return <p className="noresults mt-[138px]">내가 올린 글이 없어요.</p>;
};

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
