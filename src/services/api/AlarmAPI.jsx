import useAuthStore from '@store/authStore';
import { API } from '@utils/api';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { method } from 'lodash';
export const getAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(`/api/v1/roommate-alarms`);
	console.log(response.data.data);
	return response.data.data;
};

export const deleteAllAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms`,
		'delete',
	);
	console.log(response);
};

export const deleteAlarmAPI = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms/${id}`,
		'delete',
	);
	console.log(response);
};
