import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const chatSeverURL = 'https://api.oegaein.com:8081';

export const getChatListAPI = async (setAccessToken) => {
	try {
		const { data } = await API.get(`${chatSeverURL}/api/v1/chatrooms`);
		return data.data;
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!!!!!!' + refreshResponse.data.access_token);
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.get(`${chatSeverURL}/api/v1/chatrooms`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
					return data.data;
				} catch (error) {
					// window.location.href = 'http://localhost:3000/login';
				}
			} catch (error) {
				// window.location.href = 'http://localhost:3000/login';
			}
		} else {
			// window.location.href = 'http://localhost:3000/login';
		}
	}
};

export const getChatHistory = async (roomId, setAccessToken) => {
	try {
		const { data } = await API.get(`${chatSeverURL}/api/v1/messages/${roomId}`);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!!!!!!' + refreshResponse.data.access_token);
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.get(
						`${chatSeverURL}/api/v1/messages/${roomId}`,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						},
					);
					return data;
				} catch (error) {
					console.log('error');
					console.error(error);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
};

export const getMatchingEnd = async (setAccessToken, id) => {
	try {
		const { data } = await API.patch(`/api/v1/matchingposts/${id}`);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!!!!!!' + refreshResponse.data.access_token);
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.patch(`/api/v1/matchingposts/${id}`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
					console.log(data);
					return data;
				} catch (error) {
					// window.location.href = 'http://localhost:3000/login';
				}
			} catch (error) {
				// window.location.href = 'http://localhost:3000/login';
			}
		} else {
			// window.location.href = 'http://localhost:3000/login';
		}
	}
};

export const deleteChatRoom = async (setAccessToken, id) => {
	try {
		const result = await API.delete(`${chatSeverURL}/api/v1/chatrooms/${id}`);
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!!!!!!' + refreshResponse.data.access_token);
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.delete(
						`${chatSeverURL}/api/v1/chatrooms/${id}`,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						},
					);
					console.log(data);
					return data;
				} catch (error) {
					// window.location.href = 'http://localhost:3000/login';
				}
			} catch (error) {
				// window.location.href = 'http://localhost:3000/login';
			}
		} else {
			// window.location.href = 'http://localhost:3000/login';
		}
	}
};
