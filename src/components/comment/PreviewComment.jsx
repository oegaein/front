import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CommentInput } from '@components/basicInfo/BasicSettingInput';
import { Subtitle } from '@styles/basicInfo/Text';
import { BasicProfile } from '@common/ui/Profile';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import ArrowRightIcon from '@assets/images/common/ArrowRightIcon.svg';
import { Box } from '@pages/post/Post-detail';
import { useNavigate } from 'react-router-dom';
import { timeAgo } from '@utils/TimeAgo';

const PreviewComment = ({ postId, comments }) => {
	const id = postId;
	const navigate = useNavigate();
	const [value, setValue] = useState('');
	const [reply, setReply] = useState(false);
	const [owner, setOwner] = useState('');

	const handleReply = (index) => {
		setReply(true);
		setOwner(comments[index].author_name);
	};

	const handleMoreComment = () => {
		navigate(`/comment-detail/${postId}`, {
			state: { all: comments },
		});
	};

	return (
		<>
			{reply && (
				<CommentBox>
					<div className="ing">
						<p className="ingText">{owner} 님에게 답글 남기는 중</p>
						<p className="ingText" onClick={() => setReply(false)}>
							취소
						</p>
					</div>
					<div className="inputContainer">
						<CommentInput
							postId={id}
							setSelected={setValue}
							setReply={setReply}
						/>
					</div>
				</CommentBox>
			)}
			<CommentStyle>
				<section className="flex flex-col p-[25px] pb-[0px]">
					<Subtitle>댓글 {comments.length}개</Subtitle>
					<div className="w-full">
						<CommentInput postId={id} setSelected={setValue} />
					</div>
				</section>
				{comments.length === 0 ? (
					<div className="flex justify-center items-center p-4 mb-3">
						<p className="text-gray-400">아직 작성된 댓글이 없습니다.</p>
					</div>
				) : (
					<>
						<section className="commentbox">
							{comments.map((item, index) => (
								<div key={item.id} className="w-full mb-6">
									<BasicProfile
										Img={item.photo_url}
										nickname={item.author_name}
										content={item.content}
										mr="13px"
										width="40px"
										height="40px"
										ver="comment"
									/>
									<div className="flex justify-between mt-4 pl-12 w-[45%]">
										<span>{timeAgo(item.created_at)}</span>
										<span
											className="cursor-pointer"
											onClick={() => handleReply(index)}
										>
											답글달기
										</span>
									</div>
									{item.replies &&
										item.replies.map((reply, index) => (
											<div className="replybox">
												<BasicProfile
													Img={reply.photo_url}
													nickname={reply.author_name}
													content={reply.content}
													mr="13px"
													width="40px"
													height="40px"
													ver="comment"
												/>
												<div className="flex justify-between mt-4 pl-12 w-2/4">
													<span>{timeAgo(reply.created_at)}</span>
												</div>
											</div>
										))}
								</div>
							))}
						</section>
						<section
							className="commentBtn caption2"
							onClick={handleMoreComment}
						>
							<p className="mr-1">{comments.length}개 댓글 전체 보기</p>
							<img src={ArrowRightIcon} alt="arrow" />
						</section>
					</>
				)}
				<Box />
			</CommentStyle>
		</>
	);
};

export default PreviewComment;

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
	flex-direction: column;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 50;

	.ing {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 11px 25px;
		width: 100%;
		background-color: ${COLOR.gray50};
	}

	.ingText {
		font: ${FONT.caption3M12};
		color: ${COLOR.gray500};
	}

	.inputContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 25px 25px 0px 25px;
		width: 100%;
		background-color: ${COLOR.white};
		border: 1px solid ${COLOR.gray100};
	}
`;
