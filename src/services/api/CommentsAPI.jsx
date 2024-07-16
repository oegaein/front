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

export const postReplyAPI = async (setAccessToken, id, content) => {
	try {
		const { data } = await API.post(`/api/v1/replies`, {
			commentId: id,
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
						`/api/v1/replies`,
						{
							commentId: id,
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

export const putCommentsAPI = async (setAccessToken, commentID, content) => {
	try {
		const { data } = await API.put(`/api/v1/comments/${commentID}`, {
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
					const { data } = await API.put(
						`/api/v1/comments/${commentID}`,
						{ content: content },
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

export const putReplyAPI = async (setAccessToken, commentID, content) => {
	try {
		const { data } = await API.put(`/api/v1/comments/${commentID}`, {
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
					const { data } = await API.put(
						`/api/v1/comments/${commentID}`,
						{ content: content },
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

export const deleteCommentsAPI = async (setAccessToken, commentID) => {
	try {
		const res = await API.delete(`/api/v1/comments/${commentID}`);
		console.log(res);
		return res;
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
					const { data } = await API.delete(`/api/v1/comments/${commentID}`, {
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

export const deleteRepliesAPI = async (setAccessToken, commentID) => {
	try {
		const { data } = await API.delete(`/api/v1/replies/${commentID}`);
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
					const { data } = await API.delete(`/api/v1/replies/${commentID}`, {
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
