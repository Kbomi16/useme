import Image from "next/image"

import { sampleProjects, type SampleProject } from "./sampleProjects"

const featured = sampleProjects[0]!
const incoming = [
  { name: "민수", line: "복도 안 돌아도 되네요." },
  { name: "하은", line: "슬랙에 바로 떠서 바로 썼어요." },
] as const

export function DiscoverScreenMock() {
  return (
    <div className="bg-background flex h-full w-full max-w-[240px] flex-col overflow-hidden rounded-[22px] shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
      <div className="flex items-center justify-between px-3 py-2.5">
        <p className="text-[13px] font-bold tracking-tight">둘러보기</p>
        <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold">
          오늘
        </span>
      </div>
      <ul className="flex flex-col gap-1.5 px-2 pb-2">
        {sampleProjects.map((project, index) => (
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
    <div className="bg-background flex h-full w-full max-w-[240px] flex-col overflow-hidden rounded-[22px] shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
      <div className="bg-muted relative aspect-16/9">
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
        <p className="text-muted-foreground line-clamp-2 text-[12px] leading-snug break-keep">
          {featured.tagline}
        </p>
        <div className="bg-primary text-primary-foreground flex h-8 items-center justify-center rounded-lg text-[12px] font-semibold">
          써 보기
        </div>
      </div>
    </div>
  )
}

export function CommentScreenMock() {
  return (
    <div className="bg-background flex h-full w-full max-w-[240px] flex-col overflow-hidden rounded-[22px] shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-lg">
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
        <div className="bg-primary/10 text-primary flex h-8 items-center justify-center rounded-lg text-[12px] font-semibold">
          좋아요
        </div>
        <div className="rounded-xl bg-muted px-3 py-2 text-left">
          <p className="text-muted-foreground text-[11px] font-semibold">민수</p>
          <p className="text-[12px] leading-snug break-keep">
            복도 안 돌아도 되네요.
          </p>
        </div>
        <div className="text-muted-foreground rounded-xl px-3 py-2 text-left text-[12px] ring-1 ring-black/8">
          한 줄 남기기
        </div>
      </div>
    </div>
  )
}

export function ReceiveScreenMock() {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="bg-background w-full max-w-[280px] overflow-hidden rounded-[22px] shadow-[0_8px_24px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
        <div className="bg-muted relative aspect-16/9">
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
          <p className="text-primary text-[12px] font-semibold">좋아요 4</p>
        </div>
      </div>
      <ul className="flex w-full max-w-[280px] flex-1 flex-col gap-2">
        {incoming.map((note) => (
          <li
            key={note.name}
            className="bg-background rounded-2xl rounded-bl-md px-3 py-2.5 text-left shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5"
          >
            <p className="text-muted-foreground text-[11px] font-semibold">
              {note.name}
            </p>
            <p className="text-[13px] leading-snug break-keep">{note.line}</p>
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
          ? "bg-primary/8 ring-primary/20 flex items-center gap-2.5 rounded-xl px-2 py-2 ring-1"
          : "flex items-center gap-2.5 rounded-xl bg-muted/70 px-2 py-2"
      }
    >
      <div className="bg-muted relative size-11 shrink-0 overflow-hidden rounded-lg">
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
        <p className="text-muted-foreground truncate text-[11px]">
          {project.tagline}
        </p>
      </div>
    </li>
  )
}
