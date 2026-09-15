import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

type LogoProps = {
  className?: string
  alt?: string
}

export default function Logo({ className, alt = "useMe" }: LogoProps) {
  return (
    <span className={cn("inline-flex h-8", className)}>
      <Image
        src="/brand/logo-light.png"
        alt={alt}
        width={518}
        height={158}
        sizes="164px"
        className="block h-full w-auto dark:hidden"
        fetchPriority="high"
      />
      <Image
        src="/brand/logo-dark.png"
        alt=""
        width={518}
        height={158}
        sizes="164px"
        className="hidden h-full w-auto dark:block"
        fetchPriority="high"
        aria-hidden
      />
    </span>
  )
}
