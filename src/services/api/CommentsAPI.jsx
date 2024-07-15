import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import axios from 'axios';

export const postCommentsAPI = async (setAccessToken, id, content) => {
	try {
		const { data } = await API.post(`/api/v1/comments`, {
			matchingPostId: id,
			content: content,
		});
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
					const { data } = await API.post(
						`/api/v1/comments`,
						{
							matchingPostId: id,
							content: content,
						},
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

export const postReplyAPI = async (id, content) => {
	const { data } = await API.post(
		`https://api.oegaein.com:8080/api/v1/replies`,
		{
			commentId: id,
			content: content,
		},
	);
	return data;
};

export const putCommentsAPI = async (commentID) => {
	const { data } = await axios.put(
		`https://api.oegaein.com:8080/api/v1/comments/${commentID}`,
	);
	return data;
};

export const deleteCommentsAPI = async (commentID) => {
	const { data } = await axios.delete(
		`https://api.oegaein.com:8080/api/v1/comments/${commentID}`,
	);
	return data;
};
