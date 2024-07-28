export const timeAgo = (dateString1 = null, dateString2 = null) => {
	const date1 = dateString1 ? new Date(dateString1) : null;
  const date2 = dateString2 ? new Date(dateString2) : null;
  
  // 최신 날짜를 선택
	const latestDate = date2 && date2 > date1 ? date2 : date1;  
	const now = new Date();

	const secondsAgo = Math.floor((now - latestDate) / 1000);
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
