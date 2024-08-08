import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { toast } from 'react-toastify';

export const postMatchingPostAPI = async (submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts`,
		'post',
		submitData,
	);
	if (response.status && response.status === 201) {
		return response.data;
	} else {
		toast.error(response);
		return;
	}
};

export const getMatchingPostAPI = async (matchingpostID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${matchingpostID}`,
	);
	if (response.status && response.status === 200) {
		return response.data;
	} else {
		toast.error(response);
		return;
	}
};

export const putMatchingPostAPI = async (matchingpostID, submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${matchingpostID}`,
		'put',
		submitData,
	);
	if (response.status && response.status === 200) {
		return response.data;
	} else {
		toast.error(response);
		return;
	}
};

export const deleteMatchingPostAPI = async (matchingpostID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${matchingpostID}`,
		'delete',
	);
	if (response.status && response.status === 204) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};
