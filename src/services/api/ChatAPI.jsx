import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import axios from 'axios';

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
					console.log('error');
					console.error(error);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
};

export const getChatHistory = async (roomId, setAccessToken) => {
	try {
		const { data } = await API.get(`${chatSeverURL}/api/v1/messages/${roomId}`);
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
