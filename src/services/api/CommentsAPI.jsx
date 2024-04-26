import axios from 'axios';

export const postCommentsAPI = async (id, content) => {
	const { data } = await axios.post(
		`http://34.64.159.144:8080/api/v1/comments`,
		{
			matchingPostId: id,
			content: content,
		},
	);
	return data;
};

export const putCommentsAPI = async (commentID) => {
	const { data } = await axios.put(
		`http://34.64.159.144:8080/api/v1/comments/${commentID}`,
	);
	return data;
};

export const deleteCommentsAPI = async (commentID) => {
	const { data } = await axios.delete(
		`http://34.64.159.144:8080/api/v1/comments/${commentID}`,
	);
	return data;
};
