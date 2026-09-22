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
          className="flex items-center gap-2.5"
        >
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[12px] font-semibold text-muted-foreground"
          >
            {comment.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground">
              {comment.name}
            </p>
            <p className="text-[13px]/snug break-keep">{comment.line}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
