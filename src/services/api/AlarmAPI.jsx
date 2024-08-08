import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { toast } from 'react-toastify';
export const getAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(`/api/v1/roommate-alarms`);
	if (response === undefined) {
		return;
	} else {
		if (response.status === 200) {
			return response;
		}
	}
};

export const deleteAllAlarmAPI = async () => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms`,
		'delete',
	);
	if (response === undefined) {
		toast.error('알림을 삭제하지 못했습니다!');
		return;
	} else {
		if (response.status === 204) {
			return response;
		}
	}
};

export const deleteAlarmAPI = async (id) => {
	const response = await makeAuthorizedRequest(
		`/api/v1/roommate-alarms/${id}`,
		'delete',
	);
	if (response === undefined) {
		toast.error('알림을 삭제하지 못했습니다!');
		return;
	} else {
		if (response.status === 204) {
			return response;
		}
	}
};
