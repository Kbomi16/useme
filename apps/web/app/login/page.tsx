import LoginForm from "./_components/LoginForm"
import { getSafeNextPath } from "@/libs/supabase/env"

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 md:px-6 md:py-16">
      <div className="flex max-w-md flex-col gap-2">
        <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
          로그인/회원가입
        </h1>
        <p className="text-[17px]/relaxed break-keep text-muted-foreground">
          이메일로 들어오거나, Google·카카오로 이어 주세요.
        </p>
      </div>
      <LoginForm
        nextPath={getSafeNextPath(params.next)}
        errorMessage={params.error}
      />
    </main>
  )
}
