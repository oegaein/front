import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
// Auth 스토어 정의
const useAuthStore = create(set => ({
  accessToken: null, // 초기 상태

  // accessToken 설정
  setAccessToken: (token) => set({ accessToken: token }),

  // accessToken 제거
  removeAccessToken: () => set({ accessToken: null })
}))

// const useAuthStore = create(devtools(store))
export default useAuthStore
