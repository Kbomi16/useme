"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

gsap.registerPlugin(useGSAP)

type HeroArtProps = {
  src: string
  alt: string
}

export default function HeroArt({ src, alt }: HeroArtProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const motion = gsap.matchMedia()
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          y: 10,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
      return () => motion.revert()
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="mx-auto w-full max-w-md">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        priority
        className="h-auto w-full rounded-[32px]"
      />
    </div>
  )
}
