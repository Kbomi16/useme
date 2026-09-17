import Link from "next/link"

export default function DiscoverPromoBanner() {
  return (
    <Link
      href="/upload"
      className="focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-36 items-center justify-between gap-6 bg-primary/10 px-6 py-5 outline-none focus-visible:ring-3"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-lg font-bold tracking-tight break-keep text-foreground sm:text-xl">
          세 칸만 채우면 카드가 돼요
        </p>
        <p className="text-sm break-keep text-muted-foreground">
          이름, 한 줄, 써 볼 주소. 왜·뭘·얼마나.
        </p>
      </div>
      <span className="shrink-0 text-sm font-medium text-primary">올려보기</span>
    </Link>
  )
}
