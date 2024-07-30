import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

export const postMatchingPostAPI = async (submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts`,
		'post',
		submitData,
	);
	return response.data;
};

export const getMatchingPostAPI = async (matchingpostID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${matchingpostID}`,
	);
	return response.data;
};

export const putMatchingPostAPI = async (matchingpostID, submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${matchingpostID}`,
		'put',
		submitData,
	);
	return response.data;
};

export const deleteMatchingPostAPI = async (matchingpostID) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingposts/${matchingpostID}`,
		'delete',
	);
	return response.data;
};
