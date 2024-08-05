import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLocation } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useDormNews } from '@hooks/useDormNews';
import { API } from '@utils/api';
import useAuthStore from '@store/authStore';
//styles
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
// Import Swiper styles
import 'swiper/css';

//components
import SearchAndNotice from '@components/common/SearchAndNotice';
import RoommateSwiperList from '@components/common/RoommateSwiperList';
//images
import Next from '@assets/images/next.svg';
import Buttons from '@components/HomePage/Buttons';
import Premium from '@assets/images/premium-quality.svg';
import DormNews from '@components/HomePage/DormNews';
import AddRoommateButton from '@common/button/AddRoommateButton';

const HomePage = () => {
	useEffect(()=> {console.log('마운트')},[])
	const accessToken = useAuthStore.getState().accessToken;
	console.log(accessToken);
	const { data: dormNews, isLoading, error } = useDormNews();
	return (
		<SettingStyle className="flex flex-col gap-[10px] scroll-smooth">
			<AddRoommateButton />
			<div>
				<SearchAndNotice />
				<div className="bg-white p-[25px]">
					<div className="flex justify-between items-center mb-[15px]">
						<div className="flex">
							<h1 className="heading text-left font-bold mr-[3px]">
								오늘의 기숙사 소식
							</h1>
						</div>
						<Link to="/home/dormnews" className="more flex">
							더보기
							<img src={Next} />
						</Link>
					</div>
					{dormNews ? (
						<Swiper
							direction={'vertical'}
							modules={[Pagination, Autoplay]}
							autoplay={{ delay: 5000, disableOnInteraction: false }}
							loop={true}
							className={`mySwiper mb-[16px] h-[73px] border border-[${COLOR.gray100}] rounded-[15px]`}
						>
							{dormNews.map((news) => (
								<SwiperSlide>
									<DormNews news={news} />
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<div className="mb-[15px]">기숙사 소식이 없습니다.</div>
					)}
					<Buttons />
				</div>
			</div>
			<div className="bg-white">
				<div className="px-[25px] pt-[25px]">
					<div className="flex justify-between items-center pb-[10px]">
						<div className="flex">
							<h1 className="heading text-left font-bold mr-[3px]">
								베스트 룸메이트
							</h1>
							<img src={Premium} alt="best roommates icon" />
						</div>
						<Link to="/home/best-roommates" className="more flex">
							더보기
							<img src={Next} alt="see more icon" />
						</Link>
					</div>
					<p className="roommateMent pb-[10px]">
						이전 룸메이트로부터 좋은 평가를 받았어요
					</p>
				</div>
				<RoommateSwiperList type="best" />
			</div>
			<div className="bg-white">
				<div className="px-[25px] pt-[25px]">
					<div className="flex justify-between items-center pb-[10px]">
						<div className="flex">
							<h1 className="heading text-left font-bold mr-[3px]">
								새로 올라온 룸메이트
							</h1>
						</div>
					</div>
				</div>
				<RoommateSwiperList type="new" />
			</div>
		</SettingStyle>
	);
};

export default HomePage;

const SettingStyle = styled.div`
	background-color: ${COLOR.gray50};

	.heading {
		font-size: ${FONT.title4SB17};
	}
	.more {
		font-size: ${FONT.caption2M14};
	}
	.roommateMent {
		color: ${COLOR.gray500};
		font-size: ${FONT.caption2M14};
		text-align: left;
	}
`;
