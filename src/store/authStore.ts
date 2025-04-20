import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Auth 스토어 타입 정의
interface AuthState {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	removeAccessToken: () => void;
}

// Auth 스토어 정의
const useAuthStore = create<AuthState>()(
	devtools((set) => ({
		accessToken: null, // 초기 상태

		// accessToken 설정
		setAccessToken: (token: string | null) => set({ accessToken: token }),

		// accessToken 제거
		removeAccessToken: () => set({ accessToken: null }),
	})),
);

export default useAuthStore;
