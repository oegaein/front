import React, {useState, useEffect} from 'react'
import { throttle } from 'lodash';
const useLowerBarVisible = (value, delay) => {
  const [isLowerBarVisible, setIsLowerBarVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  const handleScroll = throttle(() => {
    const currentScrollPos = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    //페이지 총 높이
    //맨 밑으로 이동되었는지 확인하는 변수 
    let isBottom = currentScrollPos >= maxScroll-1

    setIsLowerBarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10 || isBottom)
    setPrevScrollPos(currentScrollPos)
  }, 200)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return ()=> {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, isLowerBarVisible, handleScroll])


  return isLowerBarVisible;
}

export default useLowerBarVisible