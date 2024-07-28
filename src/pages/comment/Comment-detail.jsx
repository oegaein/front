import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@common/header/Header';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Comment from '@components/comment/Comment';
import PreviewComment from '@components/comment/PreviewComment';
import { getMatchingPostAPI } from 'services/api/MatchingPostAPI';
import DetailComment from '@components/comment/DetailComment';

const CommentDetail = () => {
	const { postId } = useParams();
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getMatchingPostAPI(postId);
			setData(result);
		};
		fetchData();
		console.log(data);
	}, [postId]);

	return (
		<>
			<CommentDetailStyle>
				<div className="container">
					<Header
						backPath="/post-detail"
						rightContent=" "
						rightEvent={() => {}}
					>
						<p>댓글</p>
					</Header>
				</div>
				{data !== null && (
					<div className="w-full">
						<DetailComment postId={postId} comments={data.comments} />
					</div>
				)}
			</CommentDetailStyle>
		</>
	);
};

export default CommentDetail;

const CommentDetailStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.container {
		display: flex;
		padding: 0px 25px;
		width: 100%;
		border-bottom: 1px solid ${COLOR.gray100};

		p {
			font: ${FONT.title4SB17};
		}
	}
`;
