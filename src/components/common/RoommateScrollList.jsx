import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useMatchingPosts } from 'hooks/useMatchingPosts';
import { useQuery } from '@tanstack/react-query';
import { API } from '@utils/api';

//styles
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import styled from 'styled-components';
//images
import Filter from '@assets/images/filter.svg';
import Hourglass from '@assets/images/hourglass.svg';
import Premium from '@assets/images/premium-quality.svg';

//components
import RoommateScrollItem from '@components/RoommatePage/RoommateScrollItem';
import Pagination from '@components/common/Pagination';
import ConfirmModal from '@common/modal/ConfirmModal';

const RoommateScrollList = ({
	type,
	searchTerm,
	filteredPosts,
	setScreenType,
}) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({});
	const {
		data: matchingPosts,
		isLoading,
		error,
	} = useMatchingPosts(type, currentPage);
	const { data: searchResults } = useQuery({
		queryKey: ['searchResults', searchTerm],
		queryFn: () => fetchData(searchTerm),
		staleTime: 0,
		gcTime: 5 * 60 * 1000,
		enabled: !!searchTerm,
	});

	const fetchData = async (searchTerm) => {
		try {
			const response = await API.get(`/api/v1/search?q=${searchTerm}`);
			console.log('검색', response);
			return response.data.matching_posts_data;
		} catch (err) {
			console.log(err);
		}
	};
	const location = useLocation();
	const path = location.pathname;

	if (isLoading) return <div>데이터 로딩중</div>;
	if (error) return <div>{error.message}</div>;
	return (
		<SettingStyle>
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			<div className="flex justify-between items-center px-[24px] py-[16px]">
				{(path === '/roommate' || path === '/search') && (
					<FindRoommateTitle path={path} />
				)}
				{path === '/home/ending-soon' && <EndingSoonTitle />}
				{path === '/home/best-roommates' && <BestRoommateTitle />}
				{path === '/roommate/filter' && (
					<FilterRoommateTitle setScreenType={setScreenType} />
				)}
			</div>
			<div className="flex flex-col gap-[10px] px-[24px] pb-[11px]">
				{(() => {
					let content; // 렌더링할 내용을 담을 변수 선언
					// search일 때
					if (type === 'search') {
						if (searchResults) {
							content = searchResults.map((post) => (
								<RoommateScrollItem key={post.matchingPostId} post={post} /> // 필터링된 post에 대해 컴포넌트 리턴
							));
						} else {
							content = <div>검색 결과가 없습니다.</div>;
						}
					} else if (type === 'filters') {
						// filters일 때
						if (filteredPosts) {
							console.log(filteredPosts);
							content = filteredPosts.map((post) => (
								<RoommateScrollItem key={post.matchingPostId} post={post} />
							));
						} else {
							content = <div>필터링된 결과가 없습니다.</div>;
						}
						//그 외 new, best 등...
					} else {
						// 기본 조건일 때, matchingPosts.data 배열을 매핑하여 컴포넌트를 리턴
						if (matchingPosts?.data.length > 0) {
							content = matchingPosts.data.map((post, index) => (
								// <RoommateScrollItem key={post.matchingPostId} post={post} setConfirm={setConfirm} setConfirmContent={setConfirmContent}/>
								<RoommateScrollItem
									post={post}
									type={type}
									setConfirm={setConfirm}
									setConfirmContent={setConfirmContent}
								/>
							));
						} else {
							content = <div>결과가 존재하지 않습니다.</div>;
						}
					}
					return content; // 조건에 따라 결정된 내용을 리턴
				})()}
			</div>
			{/* <Pagination data={matchingPosts} setCurrentPage={setCurrentPage}/> */}
		</SettingStyle>
	);
};

export default RoommateScrollList;

const SettingStyle = styled.div`
	background-color: white;
	.title {
		font-size: ${FONT.title4SB17};
	}
	.sort-btn {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
		&.selected {
			color: ${COLOR.gray600};
		}
	}
	.ending-soon-btn {
		border-radius: 5px;
		width: 67px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
		background-color: ${COLOR.purple3};
		&.selected {
			color: white;
			background-color: ${COLOR.purple1};
		}
	}
`;

const FindRoommateTitle = ({ path }) => {
	const handleClickNewestBtn = () => {};
	const handleClickOldestBtn = () => {};

	return (
		<>
			<h1 className="title">룸메이트 찾기</h1>
			<div className="flex justify-between gap-[7px]">
				<button onClick={handleClickNewestBtn} className="sort-btn selected">
					최신순
				</button>
				<button onClick={handleClickOldestBtn} className="sort-btn">
					마감순
				</button>
				{path === '/roommate' && (
					<Link
						to="/roommate/filter"
						className={`flex justify-center items-center border border-[${COLOR.gray100}] h-[30px] w-[30px] rounded-[50%]`}
					>
						<img src={Filter} alt="filter icon" />
					</Link>
				)}
			</div>
		</>
	);
};

const EndingSoonTitle = () => {
	return (
		<>
			<h1 className="title flex">
				곧 모집이 종료돼요
				<img className="ml-[3px]" src={Hourglass} alt="hourglass icon" />
			</h1>
			<div className="flex justify-between gap-[4px]">
				<button className="ending-soon-btn selected">룸메이트</button>
				{/* <button className="ending-soon-btn">공동배달</button> */}
			</div>
		</>
	);
};

const BestRoommateTitle = () => {
	return (
		<>
			<h1 className="title flex">
				베스트 룸메이트
				<img className="ml-[3px]" src={Premium} alt="premium icon" />
			</h1>
			<div className="flex justify-between gap-[7px]">
				<button className="sort-btn selected">최신순</button>
				<button className="sort-btn">마감순</button>
			</div>
		</>
	);
};
const FilterRoommateTitle = ({ setScreenType }) => {
	const handleClickSortBtn = () => {
		setScreenType('filters');
	};

	return (
		<>
			<h1 className="title">필터링 결과</h1>
			<div className="flex justify-between gap-[7px]">
				<button
					onClick={handleClickSortBtn}
					className={`flex justify-center items-center border border-[${COLOR.gray100}] h-[30px] w-[30px] rounded-[50%]`}
				>
					<img src={Filter} alt="filter icon" />
				</button>
			</div>
		</>
	);
};
