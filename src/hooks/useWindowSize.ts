import { debounce } from 'lodash'
import { useState, useEffect } from 'react'

interface Size {
  width: number | undefined
  height: number | undefined
}
function useWindowSize(): Size {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 100)

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return size
}

export default useWindowSize
