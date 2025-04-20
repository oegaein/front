import axios, {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '@store/authStore';

let isToastVisible = false; // 전역 플래그 변수

interface ErrorResponseData {
	errorMessages?: {
		errorMessage?: string;
	};
}

export const API: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	timeout: 30000,
	withCredentials: true,
});

// 요청 인터셉터
API.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const accessToken = useAuthStore.getState().accessToken;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error: AxiosError): Promise<AxiosError> => {
		return Promise.reject(error);
	},
);

// 토스트 메시지 표시 함수
const showToast = (message: string): void => {
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
	(response: AxiosResponse): AxiosResponse => {
		return response;
	},
	async (error: AxiosError): Promise<AxiosError> => {
		const originalRequest = error.config;

		// 일반 에러 처리
		if (error.response) {
			const errorData = error.response.data as ErrorResponseData; // 타입 단언
			const errorMessage = errorData?.errorMessages?.errorMessage;
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
	},
);

// Access Token 설정 함수
const setAccessToken = (token: string): void => {
	useAuthStore.getState().setAccessToken(token);
};
