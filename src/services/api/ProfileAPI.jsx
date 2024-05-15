import { API } from '@utils/api';
import axios from 'axios';

export const postProfileAPI = async (submitData) => {
	const { data } = await API.post(
		`http://34.64.153.69:8080/api/v1/matchingposts`,
		submitData,
	);
	return data;
};

export const getMatchingPostAPI = async (matchingpostID) => {
	const { data } = await axios.get(
		`http://34.64.153.69:8080/api/v1/matchingposts/${102}`,
	);
	return data;
};
