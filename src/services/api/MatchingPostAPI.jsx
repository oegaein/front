import axios from 'axios';

export const postMatchingPostAPI = async (submitData) => {
	const { data } = await axios.post(
		`http://34.64.159.144:8080/api/v1/matchingposts`,
		submitData,
	);
	return data;
};

export const getMatchingPostAPI = async (matchingpostID) => {
	const { data } = await axios.get(
		`http://34.64.159.144:8080/api/v1/matchingposts/${102}`,
	);
	return data;
};
