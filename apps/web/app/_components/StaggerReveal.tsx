"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

const STAGGER_STEP_S = 0.24
const PLAY_LINE = 0.72
const ANIMATION_MS = 1000
const STUCK_BUFFER_MS = 500

type StaggerRevealProps = {
  children: ReactNode
  className?: string
}

export default function StaggerReveal({
  children,
  className,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const items = [
      ...root.querySelectorAll<HTMLElement>("[data-stagger]"),
    ]
    if (items.length === 0) return

    items.forEach((item, index) => {
      item.style.animationDelay = `${index * STAGGER_STEP_S}s`
    })
    root.classList.add("stagger-pending")

    let played = false
    const first = items[0]!
    const isReady = () => {
      const rect = first.getBoundingClientRect()
      return rect.top < window.innerHeight * PLAY_LINE
    }

    const play = () => {
      if (played || !isReady()) return
      played = true
      observer.disconnect()
      window.clearInterval(intervalId)
      root.classList.remove("stagger-pending")
      root.classList.add("stagger-play")
      window.setTimeout(() => {
        const stuck = items.some(
          (item) => getComputedStyle(item).opacity === "0"
        )
        if (!stuck) return
        root.classList.remove("stagger-play")
        items.forEach((item) => {
          item.style.animation = "none"
          item.style.opacity = "1"
          item.style.transform = "none"
        })
      }, (items.length - 1) * STAGGER_STEP_S * 1000 + ANIMATION_MS + STUCK_BUFFER_MS)
    }

    const observer = new IntersectionObserver(
      () => play(),
      { threshold: [0, 0.2, 0.4], rootMargin: "0px 0px -28% 0px" }
    )

    const intervalId = window.setInterval(play, 100)

    observer.observe(first)

    return () => {
      observer.disconnect()
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
