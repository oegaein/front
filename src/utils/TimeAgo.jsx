export const timeAgo = (dateString) => {
	const now = new Date();
	const past = new Date(dateString);
	const secondsAgo = Math.floor((now - past) / 1000);
	const minutesAgo = Math.floor(secondsAgo / 60);
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);
	const monthsAgo = Math.floor(daysAgo / 30);
	const yearsAgo = Math.floor(monthsAgo / 12);

	if (secondsAgo < 60) {
		return `${secondsAgo}초 전`;
	} else if (minutesAgo < 60) {
		return `${minutesAgo}분 전`;
	} else if (hoursAgo < 24) {
		return `${hoursAgo}시간 전`;
	} else if (daysAgo < 30) {
		return `${daysAgo}일 전`;
	} else if (monthsAgo < 12) {
		return `${monthsAgo}달 전`;
	} else {
		return `${yearsAgo}년 전`;
	}
};
