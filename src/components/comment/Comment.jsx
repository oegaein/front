import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentInput } from '@components/basicInfo/BasicSettingInput';
import { Subtitle } from '@styles/basicInfo/Text';
import { BasicProfile } from '@common/ui/Profile';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Panda from '@assets/images/common/Panda.png';
import { useNavigate } from 'react-router-dom';

const mocks = {
	count: 22,
	comments: [
		{
			id: 1,
			content: '제 친구랑 같이 신청해도 될까요?',
			time: 20,
			profile: { img: Panda, nickname: '구구국' },
			reply: {
				content: '가능합니다',
				time: 20,
				profile: { img: Panda, nickname: 'happy푸바웅' },
			},
		},
		{
			id: 2,
			content: '늦게 자는 편인데 괜찮을까요?',
			time: 20,
			profile: { img: Panda, nickname: '블루베리' },
		},
	],
};

const Comment = () => {
	const [value, setValue] = useState('');
	const [reply, setReply] = useState(false);

	const handleReply = (index) => {
		setReply(true);
	};

	return (
		<>
			<CommentStyle>
				<section className="commentbox">
					{mocks.comments.map((item, index) => (
						<div key={item.id} className="w-full mb-6">
							<div>
								<BasicProfile
									Img={item.profile.img}
									nickname={item.profile.nickname}
									content={item.content}
									mr="13px"
									width="40px"
									height="40px"
									ver="comment"
								/>
								<div className="flex justify-between mt-4 pl-12 w-5/12">
									<span>{item.time}분 전</span>
									<span
										className="cursor-pointer"
										onClick={() => handleReply(index)}
									>
										답글 달기
									</span>
								</div>
							</div>
							{item.reply && (
								<div className="replybox">
									<BasicProfile
										Img={item.reply.profile.img}
										nickname={item.reply.profile.nickname}
										content={item.reply.content}
										mr="13px"
										width="40px"
										height="40px"
										ver="comment"
										target={item.reply.target}
									/>
									<div className="flex justify-between mt-4 pl-12 w-2/4">
										<span>{item.time}분 전</span>
									</div>
								</div>
							)}
						</div>
					))}
				</section>
				<CommentBox>
					<CommentInput setSelected={setValue} setReply={setReply} />
				</CommentBox>
			</CommentStyle>
		</>
	);
};

export default Comment;

const CommentStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	span {
		font: ${FONT.caption3M12};
		color: ${COLOR.gray500};
	}

	.commentbox {
		display: flex;
		flex-direction: column;
		padding: 0px 25px;
		border-bottom: 1px solid ${COLOR.gray100};
	}

	.replybox {
		margin-top: 16px;
		margin-left: 3rem;
		padding: 10px;
		width: 89%;
		background-color: ${COLOR.gray50};
		border-radius: 10px;
	}

	.target {
		margin-right: 5px;
		font: ${FONT.caption2M14};
		color: ${COLOR.purple1};
	}

	.commentBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px 0px;
	}
`;

const CommentBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	z-index: 10;
	padding: 25px 25px 0px 25px;
	width: 100%;
	background-color: ${COLOR.white};
	border: 1px solid ${COLOR.gray100};
`;
