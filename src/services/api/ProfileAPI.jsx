import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import axios from 'axios';
import { useEffect } from 'react';

export const PostProfileAPI = async (submitData, setAccessToken) => {
	try {
		const res = await API.post(`/api/v1/member/profile`, submitData);
		console.log(res.data);
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!! + ' + refreshResponse.data.access_token);
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.post(
						'/api/v1/member/profile',
						submitData,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						},
					);
					console.log(data);
				} catch (error) {
					console.log('error');
					console.error(error);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}

	// return data;
};

export const GetDuplicate = async (nickname, setAccessToken) => {
	const reqData = {
		nickname: nickname,
	};
	try {
		const { data } = await API.post(
			`/api/v1/member/nickname/duplicate`,
			reqData,
		);
		return data.duplicated;
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
					const { data } = await API.post(
						'/api/v1/member/nickname/duplicate',
						reqData,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						},
					);
					console.log(data);
				} catch (error) {
					console.log('error');
					console.error(error);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}

	// return data;
};

export const EditProfileAPI = async (submitData, setAccessToken) => {
	try {
		const res = await API.put(`/api/v1/member/profile`, submitData);
		console.log(res.data);
	} catch (error) {
		console.error(error);
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get(`/api/v1/member/refresh`);
				console.log('refresh!! + ' + refreshResponse.data.access_token);
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				console.log(accessToken);
				try {
					const { data } = await API.put('/api/v1/member/profile', submitData, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
					console.log(data);
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
