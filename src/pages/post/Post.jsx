import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@common/header/Header';
import PostDelivery from '@components/post/PostDelivery';
import PostRoommate from '@components/post/PostRoommate';
import FONT from '@styles/fonts';

const Post = () => {
	const [currentP, setCurrentP] = useState('roommate');
	const handleSave = () => {
		alert('저장되었습니다.');
	};
	return (
		<>
			<PostStyle>
				<section className="w-full pl-7 pr-7 pb-4 border-b border-solid border-[#DEDEDE]">
					<Header
						backPath="home"
						rightContent={'임시저장'}
						rightEvent={handleSave}
					>
						<p className="currentP">룸메이트 찾기</p>
					</Header>
				</section>
				<section className="w-full p-[25px]">
					{currentP === 'roommate' ? <PostRoommate /> : <PostDelivery />}
				</section>
			</PostStyle>
		</>
	);
};

export default Post;

const PostStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 50px 0px;

	.currentP {
		font: ${FONT.title3SB17};
		margin-right: 6px;
	}
`;
