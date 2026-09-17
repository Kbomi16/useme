import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import DiscoverTryButton from "./DiscoverTryButton"

type DiscoverProjectActionsProps = {
  slug: string
  className?: string
}

export default function DiscoverProjectActions({
  slug,
  className,
}: DiscoverProjectActionsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <DiscoverTryButton className="w-full" />
      <Link
        href={`/project/${slug}`}
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        더 보기
      </Link>
    </div>
  )
}
