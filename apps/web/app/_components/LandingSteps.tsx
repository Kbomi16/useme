const steps = [
  {
    n: "1",
    title: "프로젝트를 올려요",
    body: "이름, 한 줄, 써 볼 수 있는 주소만 먼저 적어요.",
  },
  {
    n: "2",
    title: "어필 세 칸을 채워요",
    body: "문제, 한 일, 숫자. 이 세 줄이 카드가 돼요.",
  },
  {
    n: "3",
    title: "홍보팩으로 뿌려요",
    body: "카드랑 단톡용 멘트를 복사해서 어디에든 붙여요.",
  },
  {
    n: "4",
    title: "써 본 사람이 남겨요",
    body: "직접 만져 보고 좋아요나 피드백이 카드로 돌아와요.",
  },
]

export default function LandingSteps() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold tracking-tight break-keep">
        올리는 순서는 이래요.
      </h2>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.n} className="flex flex-col gap-2">
            <p className="text-primary font-mono text-sm">{step.n}</p>
            <h3 className="font-semibold tracking-tight break-keep">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed break-keep">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
