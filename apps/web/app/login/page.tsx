import SignInForm from "./_components/SignInForm"
import { getSafeNextPath } from "@/libs/supabase/env"

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 md:px-6 md:py-16">
      <div className="flex w-full max-w-md flex-col gap-8 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
            로그인
          </h1>
          <p className="text-[17px]/relaxed break-keep text-muted-foreground">
            오, 다시 오셨네요. 반가워요!
            <br />
            로그인하고 카드 올리거나, 다른 사람 것도 써 보러 가요.
          </p>
        </div>
        <SignInForm
          nextPath={getSafeNextPath(params.next, "/discover")}
          errorMessage={params.error}
        />
      </div>
    </main>
  )
}
