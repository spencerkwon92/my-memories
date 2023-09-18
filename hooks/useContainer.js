import React, {useState, useEffect} from 'react'

//Is it effective to prevent re-rendering?
export default function useContainer(size){
  const [isWidth, setIsWidth] = useState(false)


  useEffect(()=>{
    const handleResize = () => {
      setIsWidth(checkWindowSize(size))
    }

    window.addEventListener('resize', handleResize)

    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isWidth 
}

function checkWindowSize(size) {
  if (size.default) {
    return true;
  }
  if (size.sm && window.innerWidth < 640) {
    return true;
  }
  if (size.md && window.innerWidth < 768) {
    return true;
  }
  if (size.lg && window.innerWidth < 1024) {
    return true;
  }
  if (size.xl && window.innerWidth < 1280) {
    return true;
  }
  if (size["2xl"] && window.innerWidth < 1536) {
    return true;
  }
  return false;
}