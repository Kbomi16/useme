import LandingActions from "./LandingActions"

export default function LandingCtaBand() {
  return (
    <section className="bg-muted/50 flex flex-col items-start gap-5 rounded-3xl px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight break-keep">
          한 장 만들어서 뿌려 보세요.
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed break-keep">
          카드 하나면 단톡에도, 트위터에도 같아요. 구경부터 해도 돼요.
        </p>
      </div>
      <LandingActions />
    </section>
  )
}
