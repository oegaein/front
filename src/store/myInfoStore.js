import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
// Auth 스토어 정의
const useMyInfoStore = create(set => ({
  myInfo: null, // 초기 상태

  // myInfo 설정
  setMyInfo: (info) => set({ myInfo: info }),

  // myInfo 제거
  removeMyInfo: () => set({ myInfo: null })
}))

// const useMyInfoStore = create(devtools(store))
export default useMyInfoStore
