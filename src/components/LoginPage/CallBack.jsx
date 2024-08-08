import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '@utils/api';
import useAuthStore from '@store/authStore';
import useMyInfoStore from '@store/myInfoStore';

const CallBack = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const setMyInfo = useMyInfoStore((state) => state.setMyInfo);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const code = queryParams.get('code');
		const fetchData = async () => {
			try {
				const response = await API.get(
					`/api/v1/member/auth/google/callback?code=${code}`,
				);
				const accessToken = response.data.accessToken;
				const {
					email,
					gender,
					introduction,
					name,
					photoUrl,
					profileSetUpStatus,
					id,
				} = response.data;
				const myInfo = {
					email,
					gender,
					introduction,
					name,
					photoUrl,
					profileSetUpStatus,
					id,
				};
				setAccessToken(accessToken);
				setMyInfo(myInfo);
				API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				// API.defaults.withCredentials = true
				if (profileSetUpStatus) {
					navigate('/home');
				} else {
					navigate('/setting');
				}
			} catch (error) {}
		};
		if (code) {
			fetchData();
		}
	}, []);
	return <div>CallBack</div>;
};

export default CallBack;
