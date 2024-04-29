import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useMatchingPosts } from 'hooks/useMatchingPosts';

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
import { useQuery } from '@tanstack/react-query';
import { API } from '@utils/api';

const RoommateScrollList = ({ type, searchTerm, filters }) => {
	const { data: matchingPosts, isLoading, error } = useMatchingPosts(type);
	const { data: searchResults } = useQuery({
		queryKey: ['searchResults', searchTerm],
		queryFn: () => fetchData(searchTerm),
		staleTime: 0,
		gcTime: 5 * 60 * 1000,
		enabled: !!searchTerm,
	});
	const filteredPosts = (matchingPosts && filters) && 
	matchingPosts.filter(post => {
		return (filters.peopleCount.length === 0 || filters.peopleCount.includes(post.peopleCount)) &&
					 (filters.gender === '' || filters.gender === post.gender) &&
					 (filters.dong.length === 0 || filters.dong.includes(post.dong)) &&
					 (filters.roomSize.length === 0 || filters.roomSize.includes(post.roomSize)) &&
					 (post.age >= filters.minAge && post.age <= filters.maxAge) &&
					 (post.year >= filters.minYear && post.year <= filters.maxYear) &&
					 (filters.mbti.length === 0 || filters.mbti.includes(post.mbti));
					 // 여기에 다른 필터 조건들을 추가하십시오.
	});
	console.log(filteredPosts);
	
	const fetchData = async (searchTerm) => {
		try {
			const response = await API.get(`/api/v1/search?q=${searchTerm}`);
			return response.data;
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
			<div className="flex justify-between items-center px-[24px] py-[16px]">
				{(path === '/roommate' || path === '/search') && (
					<FindRoommateTitle path={path} />
				)}
				{path === '/home/ending-soon' && <EndingSoonTitle />}
				{path === '/home/best-roommates' && <BestRoommateTitle />}
			</div>
			<div className="flex flex-col gap-[10px] px-[24px] pb-[11px]">
				{type === 'search' ? (
					searchResults ? (
						searchResults.matchingPostsData.map((post) => (
							<RoommateScrollItem post={post} />
						))
					) : (
						<div>검색 결과가 없습니다.</div>
					)
				) : (
					matchingPosts.data.map((post, index) => (
						<RoommateScrollItem post={post} index={index} />
					))
				)}
			</div>
		</SettingStyle>
	);
};

export default RoommateScrollList;

const SettingStyle = styled.div`
	background-color: white;
	.title {
		font-size: ${FONT.title3SB17};
	}
	.filter-btn {
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

const FindRoommateTitle = ({path}) => {
  const handleClickNewestBtn = () => {

  }
  const handleClickOldestBtn = () => {

  }

  return (
    <>
      <h1 className='title'>룸메이트 찾기</h1>
      <div className='flex justify-between gap-[7px]'>
        <button onClick={handleClickNewestBtn} className='filter-btn selected'>최신순</button>
        <button onClick={handleClickOldestBtn} className='filter-btn'>마감순</button>
        {path === '/roommate' &&
        <Link
						to="/roommate/filter"
						className={`flex justify-center items-center border border-[${COLOR.gray100}] h-[30px] w-[30px] rounded-[50%]`}
					>
          <img src={Filter} alt='filter icon'/>
        </Link>
        }
      </div>
    </>
  )
}


const EndingSoonTitle = () => {
	return (
		<>
			<h1 className="title flex">
				곧 모집이 종료돼요
				<img className="ml-[3px]" src={Hourglass} alt="hourglass icon" />
			</h1>
			<div className="flex justify-between gap-[4px]">
				<button className="ending-soon-btn selected">룸메이트</button>
				<button className="ending-soon-btn">공동배달</button>
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
				<button className="filter-btn selected">최신순</button>
				<button className="filter-btn">마감순</button>
			</div>
		</>
	);
};
