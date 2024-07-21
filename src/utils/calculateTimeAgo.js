export const calculateTimeAgo = (updatedAt) => {
  const updatedAtDate = new Date(updatedAt);
  const now = new Date();
  const diffInMilliseconds = now - updatedAtDate;

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays >= 1) {
    return `${diffInDays}일 전`;
  } else if (diffInHours >= 1) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInMinutes}분 전`;
  }
};