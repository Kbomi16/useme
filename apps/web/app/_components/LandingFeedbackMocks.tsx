import Image from "next/image"

import {
  featuredProject,
  landingProjects,
  type SampleProject,
} from "./sampleProjects"

const featured = featuredProject
const incoming = [
  { name: "재원", line: "복도 안 돌아도 되네요." },
  { name: "유미", line: "슬랙에 바로 떠서 바로 썼어요." },
] as const

export function DiscoverScreenMock() {
  return (
    <div className="flex h-full w-full max-w-60 flex-col overflow-hidden rounded-3xl bg-background shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
      <div className="flex items-center justify-between px-3 py-2.5">
        <p className="text-[13px] font-bold tracking-tight">둘러보기</p>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
          오늘
        </span>
      </div>
      <ul className="flex flex-col gap-1.5 px-2 pb-2">
        {landingProjects.map((project, index) => (
          <DiscoverRow
            key={project.name}
            project={project}
            active={index === 0}
          />
        ))}
      </ul>
    </div>
  )
}

export function TryScreenMock() {
  return (
    <div className="flex h-full w-full max-w-60 flex-col overflow-hidden rounded-3xl bg-background shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
      <div className="relative aspect-video bg-muted">
        <Image
          src={featured.imageSrc}
          alt=""
          fill
          sizes="240px"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-[15px] font-bold tracking-tight break-keep">
          {featured.name}
        </p>
        <p className="line-clamp-2 text-xs/snug break-keep text-muted-foreground">
          {featured.tagline}
        </p>
        <div className="flex h-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
          써 보기
        </div>
      </div>
    </div>
  )
}

export function CommentScreenMock() {
  return (
    <div className="flex h-full w-full max-w-60 flex-col overflow-hidden rounded-3xl bg-background shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={featured.imageSrc}
            alt=""
            fill
            sizes="36px"
            className="object-contain"
          />
        </div>
        <p className="text-[13px] font-bold tracking-tight break-keep">
          {featured.name}
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 px-3 pb-3">
        <div className="flex h-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          좋아요
        </div>
        <div className="rounded-xl bg-muted px-3 py-2 text-left">
          <p className="text-[11px] font-semibold text-muted-foreground">
            재원
          </p>
          <p className="text-xs/snug break-keep">복도 안 돌아도 되네요.</p>
        </div>
        <div className="rounded-xl px-3 py-2 text-left text-xs text-muted-foreground ring-1 ring-black/8">
          한 줄 남기기
        </div>
      </div>
    </div>
  )
}

export function ReceiveScreenMock() {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <div className="w-full max-w-70 overflow-hidden rounded-3xl bg-background shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
        <div className="relative aspect-video bg-muted">
          <Image
            src={featured.imageSrc}
            alt=""
            fill
            sizes="280px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 p-3">
          <p className="text-[15px] font-bold tracking-tight break-keep">
            {featured.name}
          </p>
          <p className="text-xs font-semibold text-primary">좋아요 4</p>
        </div>
      </div>
      <ul className="flex w-full max-w-70 flex-1 flex-col gap-2">
        {incoming.map((note) => (
          <li
            data-stagger
            key={note.name}
            className="rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md bg-background px-3 py-2.5 text-left shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5"
          >
            <p className="text-[11px] font-semibold text-muted-foreground">
              {note.name}
            </p>
            <p className="text-[13px]/snug break-keep">{note.line}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DiscoverRow({
  project,
  active,
}: {
  project: SampleProject
  active: boolean
}) {
  return (
    <li
      className={
        active
          ? "flex items-center gap-2.5 rounded-xl bg-primary/8 px-2 py-2 ring-1 ring-primary/20"
          : "flex items-center gap-2.5 rounded-xl bg-muted/70 px-2 py-2"
      }
    >
      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={project.imageSrc}
          alt=""
          fill
          sizes="44px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 text-left">
        <p className="truncate text-[13px] font-bold tracking-tight">
          {project.name}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">
          {project.tagline}
        </p>
      </div>
    </li>
  )
}
