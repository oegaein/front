import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

export const postMatchingRequestAPI = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/matchingrequests`,
		'post',
		{ matchingPostId: id },
	);
	return response.data;
};
