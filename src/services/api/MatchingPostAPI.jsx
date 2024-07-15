import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import axios from 'axios';

export const postMatchingPostAPI = async (submitData, setAccessToken) => {
	try {
		const { data } = await API.post(`/api/v1/matchingposts`, submitData);
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
					const { data } = await API.post(
						`https://api.oegaein.com:8080/api/v1/matchingposts`,
						submitData,
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

export const getMatchingPostAPI = async (matchingpostID, setAccessToken) => {
	try {
		const { data } = await API.get(`/api/v1/matchingposts/${matchingpostID}`);
		return data;
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!!!!!!' + refreshResponse);
				setAccessToken(refreshResponse.data.accessToken);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.get(
						`https://api.oegaein.com:8080/api/v1/matchingposts/${matchingpostID}`,
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

export const getMatchingListAPI = async () => {
	const { data } = await axios.get(`/api/v1/matchingposts`);
	return data;
};
