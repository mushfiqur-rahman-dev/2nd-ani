import { useEffect, useState, type RefCallback } from 'react'

export function useReveal<T extends Element>(): [RefCallback<T>, boolean] {
  const [isVisible, setIsVisible] = useState(false)
  const [element, setElement] = useState<T | null>(null)

  useEffect(() => {
    if (!element) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])

  return [setElement, isVisible]
}
