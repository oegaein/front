import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

export const postCommentsAPI = async (id, content) => {
	const response = await makeAuthorizedRequest(`/api/v1/comments`, 'post', {
		matchingPostId: id,
		content: content,
	});
	return response;
};

export const postReplyAPI = async (id, content) => {
	const response = await makeAuthorizedRequest(`/api/v1/replies`, 'post', {
		commentId: id,
		content: content,
	});
	return response;
};

export const putCommentsAPI = async (commentID, content) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/comments/${commentID}`,
		'put',
		{
			content: content,
		},
	);
	return response.data;
};

export const putReplyAPI = async (commentID, content) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/replies/${commentID}`,
		'put',
		{
			content: content,
		},
	);
	return response.data;
};

export const deleteCommentsAPI = async (commentID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/comments/${commentID}`,
		'delete',
	);
	return response;
};

export const deleteRepliesAPI = async (commentID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/replies/${commentID}`,
		'delete',
	);
	return response;
};
