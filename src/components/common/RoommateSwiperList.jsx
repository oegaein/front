import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import RoommateSwiperItem from '../RoommatePage/RoommateSwiperItem';
import { useMatchingPosts } from 'hooks/useMatchingPosts';
import ConfirmModal from './modal/ConfirmModal';
//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
//images
import Next from '@assets/images/next.svg';

const RoommateSwiperList = ({ type }) => {
	//type: new/best/mypost/my-matchingrequests
	const { data, isLoading, error } = useMatchingPosts(type);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({});

	if (isLoading) return <div>데이터 로딩중</div>;
	if (error) return <div>에러 발생 {error.message}</div>;
	return (
		<SettingStyle className="bg-white pb-[16px]">
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			<Swiper
				slidesPerView={1.95}
				slidesOffsetBefore={12}
				slidesOffsetAfter={12}
				className="mySwiper pt-[5px]"
			>
				{data?.data?.length > 0 ? (
					data.data.map((post, index) => (
						<SwiperSlide key={post.matchingPostId}>
							<RoommateSwiperItem
								post={post}
								type={type}
								index={index}
								setConfirm={setConfirm}
								setConfirmContent={setConfirmContent}
							/>
						</SwiperSlide>
					))
				) : (
					<div className="text-center pt-[16px]">
						룸메이트 데이터가 없습니다.
					</div>
				)}
			</Swiper>
			{type === 'new' || type === 'mypost' ? (
				<div className="px-[25px] mt-[16px]">
					<Link
						to={
							type === 'new'
								? '/roommate'
								: type === 'mypost'
									? '/mypage/roommate-applylist'
									: null
						}
						className={`more flex justify-center items-center rounded-[10px] border border-[${COLOR.gray200}] h-[40px]`}
					>
						더보기
						<img src={Next} alt="see more icon" />
					</Link>
				</div>
			) : null}
		</SettingStyle>
	);
};

export default RoommateSwiperList;

const SettingStyle = styled.div`
	background-color: white;

	.more {
		font-size: ${FONT.caption2M14};
	}
`;
