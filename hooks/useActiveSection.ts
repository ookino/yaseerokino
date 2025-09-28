import { useEffect, useRef, useState } from "react"

interface UseActiveSectionOptions {
  threshold?: number
  rootMargin?: string
}

interface UseActiveSectionReturn {
  activeSection: string
  sectionsRef: { current: (HTMLElement | null)[] }
}

export function useActiveSection(
  options: UseActiveSectionOptions = {}
): UseActiveSectionReturn {
  const { threshold = 0.3, rootMargin = "0px 0px -20% 0px" } = options
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold, rootMargin }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { activeSection, sectionsRef }
}