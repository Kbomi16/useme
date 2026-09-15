import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import type { SampleProject } from "./sampleProjects"

type AppealCardProps = {
  project: SampleProject
  className?: string
}

type AppealSlotProps = {
  label: string
  value: string
}

function AppealSlot({ label, value }: AppealSlotProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-primary font-mono text-[11px] tracking-wide uppercase">
        {label}
      </p>
      <p className="text-sm leading-relaxed break-keep">{value}</p>
    </div>
  )
}

export default function AppealCard({ project, className }: AppealCardProps) {
  return (
    <Card className={cn("bg-card h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          {project.name}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed break-keep">
          {project.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <AppealSlot label="문제" value={project.problem} />
          <AppealSlot label="한 일" value={project.action} />
          <AppealSlot label="숫자" value={project.metric} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-muted-foreground text-xs">어필력</p>
            <p className="font-mono text-sm tabular-nums">{project.appeal}</p>
          </div>
          <div
            className="bg-muted h-1.5 overflow-hidden rounded-full"
            role="meter"
            aria-label={`${project.name} 어필력`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={project.appeal}
          >
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${project.appeal}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
