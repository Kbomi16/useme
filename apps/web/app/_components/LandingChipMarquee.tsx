const chips = [
  "자리비움",
  "영수증함",
  "커밋모음",
  "회고한장",
  "자리찾기",
  "더치페이",
  "슬랙알림",
  "주간로그",
]

export default function LandingChipMarquee() {
  const loop = [...chips, ...chips]

  return (
    <div className="relative overflow-hidden py-4">
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l to-transparent"
      />
      <div className="chip-marquee-track flex w-max gap-2 pr-2">
        {loop.map((chip, index) => (
          <span
            key={`${chip}-${index}`}
            className="bg-secondary text-secondary-foreground inline-flex shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
          >
            {chip}
          </span>
        ))}
      </div>
      <p className="sr-only">예시 프로젝트 이름: {chips.join(", ")}</p>
    </div>
  )
}
