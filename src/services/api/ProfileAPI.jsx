import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { toast } from 'react-toastify';

export const PostProfileAPI = async (submitData) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/member/profile`,
		'post',
		submitData,
	);
	if (response.status && response.status === 201) {
		return response;
	} else {
		toast.error(response);
		return;
	}
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
	if (response.status && response.status === 200) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const BlockUserAPI = async (block_user) => {
	const response = await makeAuthorizedRequest(`api/v1/member/block`, 'post', {
		blocked_id: block_user,
	});
	return response.data;
};
