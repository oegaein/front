import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { toast } from 'react-toastify';
export const getAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(`/api/v1/roommate-alarms`);

	if (response.status && response.status === 200) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const deleteAllAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms`,
		'delete',
	);

	if (response.status && response.status === 204) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};

export const deleteAlarmAPI = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms/${id}`,
		'delete',
	);
	if (response.status && response.status === 204) {
		return response;
	} else {
		toast.error(response);
		return;
	}
};
