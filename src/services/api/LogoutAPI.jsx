import { API } from '@utils/api';

export const LogoutAPI = async () => {
	const response = await makeAuthorizedRequest(
		`/api/v1/member/logout`,
		'post',
		{},
	);
	return response;
};
