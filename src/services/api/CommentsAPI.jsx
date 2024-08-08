import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { toast } from 'react-toastify';

export const postCommentsAPI = async (id, content) => {
	const response = await makeAuthorizedRequest(`/api/v1/comments`, 'post', {
		matchingPostId: id,
		content: content,
	});
	if (response.status && response.status === 201) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const postReplyAPI = async (id, content) => {
	const response = await makeAuthorizedRequest(`/api/v1/replies`, 'post', {
		commentId: id,
		content: content,
	});
	if (response.status && response.status === 201) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const putCommentsAPI = async (commentID, content) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/comments/${commentID}`,
		'put',
		{
			content: content,
		},
	);
	if (response.status && response.status === 200) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const putReplyAPI = async (commentID, content) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/replies/${commentID}`,
		'put',
		{
			content: content,
		},
	);
	if (response.status && response.status === 200) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const deleteCommentsAPI = async (commentID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/comments/${commentID}`,
		'delete',
	);
	if (response.status && response.status === 204) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const deleteRepliesAPI = async (commentID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/replies/${commentID}`,
		'delete',
	);
	if (response.status && response.status === 204) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};
