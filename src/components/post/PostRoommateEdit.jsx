import styled from 'styled-components';
import PostRoommate from './PostRoommate';
import Header from '@common/header/Header';
import FONT from '@styles/fonts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchingPostAPI } from 'services/api/MatchingPostAPI';

const PostRoommateEdit = () => {
	const { postId } = useParams();
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const result = await getMatchingPostAPI(postId);
			setData(result);
		};
		fetchData();
	}, [postId]);

	return (
		<>
			<EditPostStyle>
				<section className="w-full px-[25px] border-b border-solid border-[#DEDEDE] mb-6">
					<Header
						backPath="home"
						rightContent={'임시저장'}
						rightEvent={() => {}}
					>
						<p className="header">룸메이트 찾기</p>
					</Header>
				</section>
				<section className="w-full px-[25px]">
					<PostRoommate defaultValue={data} ver={'edit'} />
				</section>
			</EditPostStyle>
		</>
	);
};

export default PostRoommateEdit;

const EditPostStyle = styled.div`
	display: flex;
	flex-direction: column;

	.header {
		font: ${FONT.title3B19};
	}
`;
