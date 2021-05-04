/**
 * useViewportSize hook
 * Description: Hook to get viewport size
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import { useEffect, useState } from 'react'

const useViewportSize = () => {
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  })
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    })
  useEffect(() => (window.onresize = updateSize), [])
  return { width: size.x, height: size.y }
}

export default useViewportSize
