import Reveal from "./Reveal"

const steps = [
  {
    n: "1",
    title: "프로젝트를 올려요",
    body: "이름, 한 줄, 써 볼 수 있는 주소만 먼저 적어요.",
  },
  {
    n: "2",
    title: "세 칸을 채워요",
    body: "왜, 뭘, 얼마나. 이 세 줄이 카드가 돼요.",
  },
  {
    n: "3",
    title: "한 장으로 뿌려요",
    body: "단톡이든 트위터든, 같은 카드를 붙여요.",
  },
  {
    n: "4",
    title: "써 본 사람이 남겨요",
    body: "직접 만져 보고 좋아요나 한마디가 돌아와요.",
  },
]

export default function LandingSteps() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
        <Reveal>
          <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[32px]">
            올리는 순서는 이래요.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="flex flex-col gap-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="bg-card flex gap-4 rounded-[22px] p-5 shadow-[0_8px_24px_rgb(15_23_42/0.04)] ring-1 ring-black/5 dark:ring-white/10"
              >
                <span className="bg-primary/10 text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-2xl text-[17px] font-bold">
                  {step.n}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] font-bold tracking-tight break-keep">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
