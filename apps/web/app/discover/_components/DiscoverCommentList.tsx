import { cn } from "@workspace/ui/lib/utils"

import type { SampleComment } from "../../_components/sampleProjects"

type DiscoverCommentListProps = {
  comments: SampleComment[]
  className?: string
}

export default function DiscoverCommentList({
  comments,
  className,
}: DiscoverCommentListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {comments.map((comment) => (
        <li
          key={`${comment.name}-${comment.line}`}
          className="rounded-2xl bg-muted/70 px-3 py-2.5"
        >
          <p className="text-[11px] font-semibold text-muted-foreground">
            {comment.name}
          </p>
          <p className="text-[13px]/snug break-keep">{comment.line}</p>
        </li>
      ))}
    </ul>
  )
}
