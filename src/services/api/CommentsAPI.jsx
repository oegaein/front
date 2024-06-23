import { API } from '@utils/api';
import axios from 'axios';

export const postCommentsAPI = async (id, content) => {
	const { data } = await API.post(
		`https://api.oegaein.com:8080/api/v1/comments`,
		{
			matchingPostId: id,
			content: content,
		},
	);
	return data;
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
