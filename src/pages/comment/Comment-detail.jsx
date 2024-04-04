import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@common/header/Header';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Comment from '@components/comment/Comment';

const CommentDetail = () => {
	const { postId } = useParams();

	return (
		<>
			<CommentDetailStyle>
				<div className="container mb-6">
					<Header
						backPath="/post-detail"
						rightContent=" "
						rightEvent={() => {}}
					>
						<p>댓글</p>
					</Header>
				</div>
				<div className="w-full">
					<Comment />
				</div>
			</CommentDetailStyle>
		</>
	);
};

export default CommentDetail;

const CommentDetailStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 41px 0px 0px 0px;
	width: 100%;

	.container {
		display: flex;
		padding: 25px;
		width: 100%;
		border-bottom: 1px solid ${COLOR.gray100};

		p {
			font: ${FONT.title3SB17};
		}
	}
`;
