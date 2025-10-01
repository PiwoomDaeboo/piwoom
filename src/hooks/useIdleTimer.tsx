// hooks/useIdleTimer.ts
import { useEffect, useRef, useState } from 'react'

interface UseIdleTimerOptions {
  timeout?: number
}

export function useIdleTimer({
  timeout = 10 * 60 * 1000,
}: UseIdleTimerOptions) {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleReset = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setIsIdle(false)
      timerRef.current = setTimeout(() => {
        setIsIdle(true)
      }, timeout)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']

    events.forEach((event) => window.addEventListener(event, handleReset))
    handleReset() // 초기화

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((event) => window.removeEventListener(event, handleReset))
    }
  }, [timeout])

  return { isIdle, setIsIdle }
}
