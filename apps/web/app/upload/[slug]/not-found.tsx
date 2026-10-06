import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export default function EditProjectNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start gap-4 px-4 py-16 md:px-6">
      <h1 className="text-2xl font-bold tracking-tight">카드를 찾지 못했어요</h1>
      <p className="text-muted-foreground">
        없거나, 내가 올린 카드가 아니에요.
      </p>
      <Link href="/me" className={cn(buttonVariants({ variant: "outline" }))}>
        마이페이지로
      </Link>
    </main>
  )
}
