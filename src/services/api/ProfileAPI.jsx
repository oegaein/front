import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

export const PostProfileAPI = async (submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/member/profile`,
		'post',
		submitData,
	);
	return response.data;
};

export const GetDuplicate = async (nickname) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/member/nickname/duplicate`,
		'post',
		{ nickname: nickname },
	);
	return response.data.duplicated;
};

export const EditProfileAPI = async (submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/member/profile`,
		'put',
		submitData,
	);
	return response.data;
};

export const BlockUserAPI = async (block_user) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/member/profile`,
		'post',
		{ blocked_id: block_user },
	);
	return response.data;
};
