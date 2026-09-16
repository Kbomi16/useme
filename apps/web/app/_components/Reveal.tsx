"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@workspace/ui/lib/utils"

gsap.registerPlugin(useGSAP)

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

export default function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.registerPlugin(ScrollTrigger)

      if (immediate) {
        gsap.from(element, {
          opacity: 0,
          y: 16,
          duration: 0.65,
          delay,
          ease: "power3.out",
        })
        return
      }

      gsap.from(element, {
        y: 20,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 72%",
          once: true,
        },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
