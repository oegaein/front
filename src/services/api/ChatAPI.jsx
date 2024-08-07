import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

export const chatSeverURL = 'https://api.oegaein.org:8081';

export const getChatListAPI = async () => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/chatrooms`,
	);
	return response.data.data;
};

export const getChatHistory = async (roomId) => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/messages/${roomId}`,
	);
	return response;
};

export const getMatchingEnd = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${id}`,
		'patch',
	);
	return response.data;
};

export const deleteChatRoom = async (id) => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/chatrooms/${id}`,
		'delete',
	);
	return response;
};

export const getChattingCountAPI = async () => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/chatrooms/unread`,
	);
	return response.data.totalUnreadMessageCount;
};
