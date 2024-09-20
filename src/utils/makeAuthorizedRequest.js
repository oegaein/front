import { API } from './api';

const makeAuthorizedRequest = async (url, method = 'get', config) => {
	try {
		let response;
		switch (method) {
			case 'get':
				response = await API.get(url);
				break;
			case 'post':
				response = await API.post(url, config);
				break;
			case 'put':
				response = await API.put(url, config);
				break;
			case 'delete':
				response = await API.delete(url, { data: config });
				break;
			case 'patch':
				response = await API.patch(url);
				break;
			default:
				throw new Error('Invalid HTTP method');
		}
		return response;
	} catch (error) {
		
		console.error('makeAuthorizedRequest',error);
	}
};


export { makeAuthorizedRequest };

