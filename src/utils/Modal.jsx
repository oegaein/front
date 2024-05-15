export const EditFunc = () => {
	navigate('/post-edit');
};

export const DeleteFunc = () => {
	setConfirm(true);
	setConfirmContent((prev) => ({
		...prev,
		msg: '게시글을 삭제할까요?',
		btn: '삭제',
		id: 1,
		func: () => {
			alert('삭제 API');
		},
	}));
};

export const BlockFunc = () => {
	setConfirm(true);
	setConfirmContent((prev) => ({
		...prev,
		msg: `${mocks.profile.nickname}님을 차단할까요?`, // 작성자 이름
		btn: '차단',
		id: 1,
		func: () => {
			alert('차단 API');
		},
	}));
};

export const postOptions = [
	{
		content: '수정하기',
		func: EditFunc,
	},
	{
		content: '삭제하기',
		func: DeleteFunc,
	},
];
export const yourOption = [
	{
		content: '차단하기',
		func: BlockFunc,
	},
];
