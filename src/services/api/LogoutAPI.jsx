import { API } from '@utils/api';

export const LogoutAPI = () => {
	API.post(`/api/v1/member/logout`, {}).then((res) => {
		console.log(res.data.message);
		if (res.data.message) {
			window.location.href = 'http://localhost:3000/login';
		} else {
			console.log('실패');
		}
	});
};
