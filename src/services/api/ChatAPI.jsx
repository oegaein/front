import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { toast } from 'react-toastify';

export const chatSeverURL = 'https://api.oegaein.org:8081';

export const getChatListAPI = async () => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/chatrooms`,
	);
	if (response.status && response.status === 200) {
		return response.data.data;
	} else {
		toast.error(response);
		return;
	}
};

export const getChatHistory = async (roomId) => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/messages/${roomId}`,
	);
	if (response.status && response.status === 200) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const getMatchingEnd = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${id}`,
		'patch',
	);
	if (response.status && response.status === 200) {
		return response.data;
	} else {
		toast.error(response);
		return;
	}
};

export const deleteChatRoom = async (id) => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/chatrooms/${id}`,
		'delete',
	);
	console.log(response);
	if (response.status && response.status === 204) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const getChattingCountAPI = async () => {
	const response = await makeAuthorizedRequest(
		`${chatSeverURL}/api/v1/chatrooms/unread`,
	);
	if (response.status && response.status === 200) {
		return response.data.totalUnreadMessageCount;
	} else {
		toast.error(response);
		return;
	}
};
