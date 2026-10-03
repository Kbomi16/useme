"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { type ChangeEvent, type ReactNode, useRef, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { toast } from "@workspace/ui/components/sonner"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

import { getErrorMessage, fieldClassName } from "@/app/login/_components/authFormShared"
import { httpClient } from "@/libs/httpClient"
import {
  COVER_ACCEPT,
  COVER_MAX_BYTES,
  isCoverMime,
} from "@/libs/projects/covers"
import { uploadProjectCover } from "@/libs/projects/uploadCover"

import ProjectBodyEditor, {
  type ProjectBodyEditorHandle,
} from "./ProjectBodyEditor"
import {
  emptyUploadValues,
  uploadSchema,
  type UploadValues,
} from "./uploadSchema"

type UploadFormProps = {
  mode?: "create" | "edit"
  projectSlug?: string
  initialValues?: UploadValues
  coverUrl?: string | null
}

type UploadSubmit = {
  values: UploadValues
  cover: File | null
}

const toastActionError = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message && !axios.isAxiosError(error)) {
    toast.error(error.message)
    return
  }

  toast.error(getErrorMessage(error, fallback))
}

export default function UploadForm({
  mode = "create",
  projectSlug,
  initialValues = emptyUploadValues,
  coverUrl = null,
}: UploadFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)

  const bodyEditorRef = useRef<ProjectBodyEditorHandle>(null)
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
    mutationFn: async ({ values, cover }: UploadSubmit) => {
      const body =
        (await bodyEditorRef.current?.commitImages(values.body)) ?? values.body
      const { data } = await httpClient.post<{ slug: string }>("/projects", {
        ...values,
        body,
      })

      if (!cover) return { slug: data.slug, coverError: null as string | null }

      try {
        await uploadProjectCover(data.slug, cover)
        return { slug: data.slug, coverError: null as string | null }
      } catch (error) {
        return {
          slug: data.slug,
          coverError:
            error instanceof Error ? error.message : "이미지를 올리지 못했어요.",
        }
      }
    },
    onSuccess: (data) => {
      if (data.coverError) toast.error(data.coverError)
      toast.success("카드를 등록했어요.")
      router.push(`/upload/${encodeURIComponent(data.slug)}`)
      router.refresh()
    },
    onError: (error) => {
      toastActionError(error, "카드를 등록하지 못했어요.")
    },
  })

  const handleRegister = handleSubmit((values) => {
    createMutation.mutate({ values, cover: coverFile })
  })

  // ! [PATCH] 카드 수정
  const updateMutation = useMutation({
    mutationFn: async ({ values, cover }: UploadSubmit) => {
      const body =
        (await bodyEditorRef.current?.commitImages(values.body)) ?? values.body
      await httpClient.patch(
        `/projects/${encodeURIComponent(projectSlug ?? "")}`,
        { ...values, body },
      )

      if (!cover) return { coverError: null as string | null }

      try {
        await uploadProjectCover(projectSlug ?? "", cover)
        return { coverError: null as string | null }
      } catch (error) {
        return {
          coverError:
            error instanceof Error ? error.message : "이미지를 올리지 못했어요.",
        }
      }
    },
    onSuccess: (data) => {
      if (data.coverError) {
        toast.error(data.coverError)
        return
      }

      toast.success("카드를 수정했어요.")
      router.refresh()
    },
    onError: (error) => {
      toastActionError(error, "카드를 수정하지 못했어요.")
    },
  })

  const handleUpdate = handleSubmit((values) => {
    updateMutation.mutate({ values, cover: coverFile })
  })

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null

    if (!file) return

    if (!isCoverMime(file.type)) {
      toast.error("jpg, png, webp만 올릴 수 있어요.")
      event.currentTarget.value = ""
      return
    }

    if (file.size > COVER_MAX_BYTES) {
      toast.error("이미지는 5MB까지 올릴 수 있어요.")
      event.currentTarget.value = ""
      return
    }

    setCoverFile(file)
    setLocalPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return URL.createObjectURL(file)
    })
  }

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
        <UploadField
          id="project-cover"
          label="카드 이미지"
          hint="jpg, png, webp · 5MB까지"
        >
          <Input
            id="project-cover"
            type="file"
            accept={COVER_ACCEPT}
            className="h-11 cursor-pointer rounded-lg pt-2"
            onChange={handleCoverChange}
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
                commitRef={bodyEditorRef}
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
      <UploadPreview
        draft={draft}
        imageUrl={localPreviewUrl ?? coverUrl}
      />
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

function UploadPreview({
  draft,
  imageUrl,
}: {
  draft: UploadValues
  imageUrl: string | null
}) {
  const slots = [
    { hint: "왜", text: draft.problem || "왜 만들었어요?" },
    { hint: "뭘", text: draft.action || "뭘 했어요?" },
    { hint: "얼마나", text: draft.metric || "얼마나 돼요?" },
  ]

  return (
    <aside className="lg:sticky lg:top-24">
      <p className="mb-3 text-[13px] font-semibold text-primary">카드 미리보기</p>
      <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/10">
        <div className="relative aspect-video bg-muted">
          {imageUrl ? (
            imageUrl.startsWith("blob:") ? (
              // blob 미리보기는 next/image가 다루지 않아요.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt=""
                className="size-full object-contain"
              />
            ) : (
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="320px"
                className="object-contain"
              />
            )
          ) : (
            <p className="flex size-full items-center justify-center px-4 text-center text-[13px] break-keep text-muted-foreground">
              카드 이미지를 고르면 여기에 보여요
            </p>
          )}
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
