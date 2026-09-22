"use client"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"

type DiscoverTryButtonProps = {
  className?: string
}

export default function DiscoverTryButton({ className }: DiscoverTryButtonProps) {
  const handleTry = () => {
    toast.info("로그인은 다음에 붙일게요.")
  }

  return (
    <Button type="button" className={className} onClick={handleTry}>
      써 보기
    </Button>
  )
}
