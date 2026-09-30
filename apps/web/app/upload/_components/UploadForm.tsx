"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { type ReactNode } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { toast } from "@workspace/ui/components/sonner"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

import { getErrorMessage, fieldClassName } from "@/app/login/_components/authFormShared"
import { httpClient } from "@/libs/httpClient"

import ProjectBodyEditor from "./ProjectBodyEditor"
import {
  emptyUploadValues,
  uploadSchema,
  type UploadValues,
} from "./uploadSchema"

type UploadFormProps = {
  mode?: "create" | "edit"
  projectSlug?: string
  initialValues?: UploadValues
}

export default function UploadForm({
  mode = "create",
  projectSlug,
  initialValues = emptyUploadValues,
}: UploadFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UploadValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: initialValues,
  })

  const watched = useWatch({ control, defaultValue: initialValues })
  const draft: UploadValues = { ...emptyUploadValues, ...watched }

  // ! [POST] 카드 등록
  const createMutation = useMutation({
    mutationFn: (payload: UploadValues) =>
      httpClient
        .post<{ slug: string }>("/projects", payload)
        .then((response) => response.data),
    onSuccess: (data) => {
      toast.success("카드를 등록했어요.")
      router.push(`/upload/${encodeURIComponent(data.slug)}`)
      router.refresh()
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "카드를 등록하지 못했어요."))
    },
  })

  const handleRegister = handleSubmit((values) => {
    createMutation.mutate(values)
  })

  // ! [PATCH] 카드 수정
  const updateMutation = useMutation({
    mutationFn: (payload: UploadValues) =>
      httpClient.patch(`/projects/${encodeURIComponent(projectSlug ?? "")}`, payload),
    onSuccess: () => {
      toast.success("카드를 수정했어요.")
      router.refresh()
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "카드를 수정하지 못했어요."))
    },
  })

  const handleUpdate = handleSubmit((values) => {
    updateMutation.mutate(values)
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleCancel = () => {
    router.push(mode === "edit" ? "/me" : "/discover")
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form
        className="flex flex-col gap-5"
        onSubmit={mode === "edit" ? handleUpdate : handleRegister}
        noValidate
      >
        <UploadField
          id="project-name"
          label="이름"
          hint="사람들이 부르는 이름"
          error={errors.name?.message}
        >
          <Input
            id="project-name"
            placeholder="자리비움"
            autoComplete="off"
            className={fieldClassName}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "project-name-error" : undefined}
            {...register("name")}
          />
        </UploadField>
        <UploadField
          id="project-tagline"
          label="한 줄"
          hint="뭐 하는 건지"
          error={errors.tagline?.message}
        >
          <Input
            id="project-tagline"
            placeholder="빈 회의실을 찾으러 복도를 안 돌아도 돼요."
            autoComplete="off"
            className={fieldClassName}
            aria-invalid={Boolean(errors.tagline)}
            aria-describedby={
              errors.tagline ? "project-tagline-error" : undefined
            }
            {...register("tagline")}
          />
        </UploadField>
        <UploadField
          id="project-url"
          label="써 볼 수 있는 주소"
          hint="눌러서 바로 만져 보는 곳"
          error={errors.url?.message}
        >
          <Input
            id="project-url"
            type="url"
            inputMode="url"
            placeholder="https://"
            autoComplete="url"
            className={fieldClassName}
            aria-invalid={Boolean(errors.url)}
            aria-describedby={errors.url ? "project-url-error" : undefined}
            {...register("url")}
          />
        </UploadField>
        <fieldset className="flex flex-col gap-4 rounded-2xl bg-muted/50 p-4 sm:p-5">
          <legend className="px-1 text-left text-sm font-semibold text-foreground">
            왜 · 뭘 · 얼마나
          </legend>
          <div className="grid gap-4 sm:grid-cols-3">
            <UploadField
              id="project-problem"
              label="왜"
              hint="뭘 불편해서"
              error={errors.problem?.message}
            >
              <Textarea
                id="project-problem"
                placeholder="쓸 수 있는 방인지 보러 매번 일어나요."
                className="min-h-28 rounded-lg px-2.5 py-3"
                aria-invalid={Boolean(errors.problem)}
                aria-describedby={
                  errors.problem ? "project-problem-error" : undefined
                }
                {...register("problem")}
              />
            </UploadField>
            <UploadField
              id="project-action"
              label="뭘"
              hint="어떻게 없앴는지"
              error={errors.action?.message}
            >
              <Textarea
                id="project-action"
                placeholder="캘린더랑 붙여서 비는 방을 슬랙에 알려줘요."
                className="min-h-28 rounded-lg px-2.5 py-3"
                aria-invalid={Boolean(errors.action)}
                aria-describedby={
                  errors.action ? "project-action-error" : undefined
                }
                {...register("action")}
              />
            </UploadField>
            <UploadField
              id="project-metric"
              label="얼마나"
              hint="감이 오는 숫자"
              error={errors.metric?.message}
            >
              <Textarea
                id="project-metric"
                placeholder="팀 12명이 하루 네 번은 덜 걸어가요."
                className="min-h-28 rounded-lg px-2.5 py-3"
                aria-invalid={Boolean(errors.metric)}
                aria-describedby={
                  errors.metric ? "project-metric-error" : undefined
                }
                {...register("metric")}
              />
            </UploadField>
          </div>
        </fieldset>
        <UploadField
          id="project-body"
          label="프로젝트 설명"
          hint="마크다운으로 자유롭게. 이미지도 넣을 수 있어요."
          error={errors.body?.message}
        >
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <ProjectBodyEditor
                value={field.value}
                invalid={Boolean(errors.body)}
                describedBy={errors.body ? "project-body-error" : undefined}
                onChange={field.onChange}
              />
            )}
          />
        </UploadField>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className={cn("w-full sm:flex-1", fieldClassName)}
            disabled={isPending}
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="submit"
            className={cn("w-full sm:flex-1", fieldClassName)}
            disabled={isPending}
          >
            {mode === "edit"
              ? isPending
                ? "수정 중"
                : "수정"
              : isPending
                ? "등록 중"
                : "등록"}
          </Button>
        </div>
      </form>
      <UploadPreview draft={draft} />
    </div>
  )
}

type UploadFieldProps = {
  id: string
  label: string
  hint: string
  error?: string
  children: ReactNode
}

function UploadField({ id, label, hint, error, children }: UploadFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-[13px] text-muted-foreground">{hint}</p>
      </div>
      {children}
      {error ? (
        <p id={errorId} className="text-sm break-keep text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function UploadPreview({ draft }: { draft: UploadValues }) {
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
