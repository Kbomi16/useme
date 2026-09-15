"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

gsap.registerPlugin(useGSAP)

export default function LandingHeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      gsap.to(sceneRef.current, {
        y: 10,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    },
    { scope: sceneRef }
  )

  return (
    <div ref={sceneRef} className="w-full">
      <Image
        src="/illustrations/hero-card-grin.png"
        alt="어필 카드를 들고 있는 사람"
        width={1280}
        height={720}
        priority
        className="h-auto w-full"
      />
    </div>
  )
}
