import axios from 'axios';

export const postMatchingRequestAPI = async (id) => {
	const { data } = await axios.post(
		`http://34.64.153.69:8080/api/v1/matchingrequests`,
		id,
	);
	return data;
};
