import Link from "next/link"
import { redirect } from "next/navigation"

import { buttonVariants } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import MyPageSignOut from "./_components/MyPageSignOut"
import { getMyProfile } from "@/libs/auth/getMyProfile"

const formatCredits = (value: number) =>
  new Intl.NumberFormat("ko-KR").format(value)

export default async function MyPage() {
  const profile = await getMyProfile()

  if (!profile) {
    redirect("/login?next=/me")
  }

  const initial = profile.displayName.trim().slice(0, 1) || "?"

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-sm font-semibold text-primary">마이페이지</p>
        <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
          {profile.displayName}님, 안녕하세요
        </h1>
        <p className="text-[17px]/relaxed break-keep text-muted-foreground">
          프로필과 크레딧은 여기서만 확인해요. 카드 올리기는 올리기 메뉴에서.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
        <Card>
          <CardHeader>
            <CardTitle>프로필</CardTitle>
            <CardDescription>공개 프로필에 쓰이는 정보예요.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground ring-4 ring-background"
            >
              {initial}
            </span>
            <dl className="flex min-w-0 flex-1 flex-col gap-3 text-sm">
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">이름</dt>
                <dd className="font-medium">{profile.displayName}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">아이디</dt>
                <dd className="font-medium">@{profile.username}</dd>
              </div>
              {profile.email ? (
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">이메일</dt>
                  <dd className="truncate font-medium">{profile.email}</dd>
                </div>
              ) : null}
              {profile.bio ? (
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">소개</dt>
                  <dd className="break-keep text-foreground">{profile.bio}</dd>
                </div>
              ) : null}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>크레딧</CardTitle>
            <CardDescription>활동으로 쌓는 잔액이에요.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-muted-foreground">잔액</p>
              <p className="text-3xl font-bold tabular-nums tracking-tight">
                {formatCredits(profile.creditBalance)}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">티어</dt>
                <dd className="font-medium">{profile.tier}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">누적 획득</dt>
                <dd className="font-medium tabular-nums">
                  {formatCredits(profile.creditEarnedTotal)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/upload"
            className={cn(buttonVariants({ variant: "default" }), "h-10")}
          >
            카드 올리기
          </Link>
          <Link
            href="/discover"
            className={cn(buttonVariants({ variant: "outline" }), "h-10")}
          >
            둘러보기
          </Link>
        </div>
        <MyPageSignOut />
      </div>
    </main>
  )
}
