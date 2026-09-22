import UploadForm from "./_components/UploadForm"

export default function UploadPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-sm font-semibold text-primary">올리기</p>
        <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
          세 칸만 채우면 카드가 돼요
        </h1>
        <p className="text-[17px]/relaxed break-keep text-muted-foreground">
          이름, 한 줄, 써 볼 주소, 그리고 왜·뭘·얼마나. 저장은 다음에 붙일게요.
        </p>
      </div>
      <UploadForm />
    </main>
  )
}
