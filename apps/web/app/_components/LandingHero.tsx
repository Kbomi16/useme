import AppealCard from "./AppealCard"
import LandingActions from "./LandingActions"
import { sampleProjects } from "./sampleProjects"

export default function LandingHero() {
  const featured = sampleProjects[0]

  return (
    <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
      <div className="flex flex-col gap-6">
        <p className="text-primary font-mono text-xs tracking-wide">useMe()</p>
        <h1 className="text-3xl leading-tight font-bold tracking-tight break-keep sm:text-4xl">
          링크만 보내지 말고, 써 보라고 해요.
        </h1>
        <p className="text-muted-foreground max-w-md text-base leading-relaxed break-keep">
          토이프로젝트를 한 장짜리 어필 카드로 만들어요. 온 사람은 직접 써 보고,
          좋아요나 한마디를 남겨요.
        </p>
        <LandingActions />
      </div>
      {featured ? <AppealCard project={featured} /> : null}
    </section>
  )
}
