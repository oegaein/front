import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
// Auth 스토어 정의
const useRefreshStore = create(set => ({
  refreshToken: null, // 초기 상태

  // refreshToken 설정
  setRefreshToken: (token) => set({ refreshToken: token }),

  // refreshToken 제거
  removeRefreshToken: () => set({ refreshToken: null })
}))

// const useRefreshStore = create(devtools(store))
export default useRefreshStore
