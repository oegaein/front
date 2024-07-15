import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
export const getAlarmAPI = async (setAccessToken) => {
	try {
		const { data } = await API.get(`/api/v1/roommate-alarms`);
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
					const { data } = await API.get(`/api/v1/roommate-alarms`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
					return data;
				} catch (error) {
					console.log('error');
					console.error(error);
				}
			} catch (error) {
				console.error(error);
				window.location.href = 'http://localhost:3000/login';
			}
		}
	}
};

export const deleteAllAlarmAPI = async (setAccessToken) => {
	try {
		const { data } = await API.delete(`/api/v1/roommate-alarms`);
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
					const { data } = await API.delete(`/api/v1/roommate-alarms`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
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

export const deleteAlarmAPI = async (id, setAccessToken) => {
	try {
		const { data } = await API.delete(`/api/v1/roommate-alarms/${id}`);
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
					const { data } = await API.delete(`/api/v1/roommate-alarms`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
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
