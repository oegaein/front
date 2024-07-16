import { API } from './api';
import useAuthStore from '@store/authStore';
import { useNavigate } from 'react-router-dom';
const makeAuthorizedRequest = async (url, method = 'get', config) => {
  try {
    let response;
    console.log(config)
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
        response = await API.delete(url, {data: config});
        break;
      case 'patch':
        response = await API.patch(url);
        break;
      default:
        throw new Error('Invalid HTTP method');
    }    
    console.log(response)
    return response;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 403) {
      try {
        const refreshResponse = await API.get('/api/v1/member/refresh');
        setAccessToken(refreshResponse.data.access_token);
        const accessToken = useAuthStore.getState().accessToken;
        // let newConfig = {
        //   ...config,
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // };
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        return await makeAuthorizedRequest(url, method, config);
      } catch (error) {
        console.error(error);
        NavigateToLogin()
        throw error;
      }
    }
    throw error;
  }
};


const setAccessToken = (token) => {
  useAuthStore.getState().setAccessToken(token);
};

const NavigateToLogin = () => {
  const navigate = useNavigate();
  navigate('/login');
};


export { makeAuthorizedRequest };
