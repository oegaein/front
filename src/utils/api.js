import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '@store/authStore';

let isToastVisible = false; // 전역 플래그 변수

export const API = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 30000,
  withCredentials: true
});

// 요청 인터셉터
API.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 토스트 메시지 표시 함수
const showToast = (message) => {
  if (!isToastVisible) {
    isToastVisible = true;
    toast.error(message);
    setTimeout(() => {
      isToastVisible = false;
    }, 3000);
  }
};

// 응답 인터셉터
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 재전송 방지 플래그
    if (error.response && error.response.status === 403) {
      if (!originalRequest._retry) {
        originalRequest._retry = true; // 재전송 플래그 설정
        try {
          const refreshResponse = await axios.get('http://127.0.0.1:8080/api/v1/member/refresh');
          if (refreshResponse.status === 200) {
            setAccessToken(refreshResponse.data.access_token);
            API.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.access_token}`;
            return API(originalRequest); // 원래 요청 재전송
          }
        } catch (refreshError) {
          showToast('로그인이 필요한 서비스입니다!');
          setTimeout(() => {
            window.location.href = 'http://127.0.0.1:3000/login';
          }, 3000);
        }
      }
    }

    // 일반 에러 처리
    if (error.response) {
      const errorMessage = error.response.data?.errorMessages?.errorMessage;
      if (errorMessage) {
        showToast(errorMessage);
      } else {
        showToast('알 수 없는 오류가 발생했습니다.');
      }
    } else if (error.request) {
      // 요청은 했지만 응답이 없는 경우
      showToast('서버에서 응답이 없습니다. 네트워크를 확인하세요.');
    } else {
      // 기타 에러
      showToast(`오류 발생: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

// Access Token 설정 함수
const setAccessToken = (token) => {
  useAuthStore.getState().setAccessToken(token);
};
