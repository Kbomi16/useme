"use client"

import Link from "next/link"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"

export default function LandingActions() {
  const handlePublish = () => {
    toast.info("로그인은 다음에 붙일게요.")
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <Button
        type="button"
        size="lg"
        className="h-11 px-5"
        onClick={handlePublish}
      >
        내 프로젝트 올려보기
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="h-11 px-5"
        nativeButton={false}
        render={<Link href="/discover" />}
      >
        둘러보기
      </Button>
    </div>
  )
}
