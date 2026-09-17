"use client"

import { useState, type FormEvent, type ReactNode } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { toast } from "@workspace/ui/components/sonner"
import { Textarea } from "@workspace/ui/components/textarea"

type UploadDraft = {
  name: string
  tagline: string
  url: string
  problem: string
  action: string
  metric: string
}

const emptyDraft: UploadDraft = {
  name: "",
  tagline: "",
  url: "",
  problem: "",
  action: "",
  metric: "",
}

export default function UploadForm() {
  const [draft, setDraft] = useState<UploadDraft>(emptyDraft)

  const handleChange = (field: keyof UploadDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast.info("로그인은 다음에 붙일게요.")
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Field
          id="project-name"
          label="이름"
          hint="사람들이 부르는 이름"
        >
          <Input
            id="project-name"
            value={draft.name}
            placeholder="자리비움"
            onChange={(event) => handleChange("name", event.currentTarget.value)}
          />
        </Field>
        <Field id="project-tagline" label="한 줄" hint="뭐 하는 건지">
          <Input
            id="project-tagline"
            value={draft.tagline}
            placeholder="빈 회의실을 찾으러 복도를 안 돌아도 돼요."
            onChange={(event) =>
              handleChange("tagline", event.currentTarget.value)
            }
          />
        </Field>
        <Field
          id="project-url"
          label="써 볼 수 있는 주소"
          hint="눌러서 바로 만져 보는 곳"
        >
          <Input
            id="project-url"
            type="url"
            value={draft.url}
            placeholder="https://"
            onChange={(event) => handleChange("url", event.currentTarget.value)}
          />
        </Field>
        <div className="grid gap-6 sm:grid-cols-3">
          <Field id="project-problem" label="왜" hint="뭘 불편해서">
            <Textarea
              id="project-problem"
              value={draft.problem}
              placeholder="쓸 수 있는 방인지 보러 매번 일어나요."
              onChange={(event) =>
                handleChange("problem", event.currentTarget.value)
              }
            />
          </Field>
          <Field id="project-action" label="뭘" hint="어떻게 없앴는지">
            <Textarea
              id="project-action"
              value={draft.action}
              placeholder="캘린더랑 붙여서 비는 방을 슬랙에 알려줘요."
              onChange={(event) =>
                handleChange("action", event.currentTarget.value)
              }
            />
          </Field>
          <Field id="project-metric" label="얼마나" hint="감이 오는 숫자">
            <Textarea
              id="project-metric"
              value={draft.metric}
              placeholder="팀 12명이 하루 네 번은 덜 걸어가요."
              onChange={(event) =>
                handleChange("metric", event.currentTarget.value)
              }
            />
          </Field>
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 rounded-2xl px-6 text-base font-semibold sm:self-start"
        >
          카드로 내보내기
        </Button>
      </form>
      <UploadPreview draft={draft} />
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  hint: string
  children: ReactNode
}

function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-[13px] text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  )
}

function UploadPreview({ draft }: { draft: UploadDraft }) {
  const slots = [
    { hint: "왜", text: draft.problem || "왜 만들었어요?" },
    { hint: "뭘", text: draft.action || "뭘 했어요?" },
    { hint: "얼마나", text: draft.metric || "얼마나 돼요?" },
  ]

  return (
    <aside className="lg:sticky lg:top-24">
      <p className="mb-3 text-[13px] font-semibold text-primary">카드 미리보기</p>
      <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/10">
        <div className="flex aspect-video items-center justify-center bg-muted px-4 text-center text-[13px] break-keep text-muted-foreground">
          이미지는 다음에 붙일게요
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg/snug font-bold tracking-tight break-keep">
              {draft.name || "프로젝트 이름"}
            </h2>
            <p className="text-[13px]/relaxed break-keep text-muted-foreground">
              {draft.tagline || "한 줄로 뭐 하는 건지"}
            </p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {slots.map((slot) => (
              <li key={slot.hint} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                  {slot.hint}
                </span>
                <p className="text-[13px]/snug break-keep">{slot.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </aside>
  )
}
