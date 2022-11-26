import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

type useComponentVisibleObject = {
  ref: any
  isComponentVisible: boolean
  setIsComponentVisible: Dispatch<SetStateAction<boolean>>
}
export default function useComponentVisible(initialIsVisible: boolean): useComponentVisibleObject {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  return { ref, isComponentVisible, setIsComponentVisible }
}
