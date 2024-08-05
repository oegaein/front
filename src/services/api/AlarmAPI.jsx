import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
export const getAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(`/api/v1/roommate-alarms`);
	return response.data.data;
};

export const deleteAllAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms`,
		'delete',
	);
	return response.data;
};

export const deleteAlarmAPI = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms/${id}`,
		'delete',
	);
	return response.data;
};
