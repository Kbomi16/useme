import SignUpForm from "./_components/SignUpForm"
import { getSafeNextPath } from "@/libs/supabase/env"

type SignUpPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 md:px-6 md:py-16">
      <div className="flex w-full max-w-md flex-col gap-8 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
            회원가입
          </h1>
          <p className="text-[17px]/relaxed break-keep text-muted-foreground">
            와, 처음 오셨네요. 반가워요!
            <br />
            가입하고 카드 한 장 만들어 단톡에 던져 보세요.
          </p>
        </div>
        <SignUpForm
          nextPath={getSafeNextPath(params.next)}
          errorMessage={params.error}
        />
      </div>
    </main>
  )
}
