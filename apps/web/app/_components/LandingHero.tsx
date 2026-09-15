import LandingActions from "./LandingActions"
import LandingChipMarquee from "./LandingChipMarquee"
import LandingHeroScene from "./LandingHeroScene"

export default function LandingHero() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 pt-12 pb-10 sm:pt-16">
      <div className="flex max-w-2xl flex-col items-center gap-5 text-center">
        <p className="landing-in text-primary text-[15px] font-semibold">
          useMe에서는
        </p>
        <h1 className="landing-in landing-in-d1 text-[36px] leading-[1.22] font-bold tracking-tight break-keep sm:text-[52px]">
          링크만 보내지 말고,
          <br />
          써 보라고 해요.
        </h1>
        <p className="landing-in landing-in-d2 text-muted-foreground max-w-md text-[17px] leading-relaxed break-keep">
          토이프로젝트를 한 장짜리 어필 카드로 만들어요. 단톡에 그 장을 보내면,
          온 사람이 바로 눌러서 써 볼 수 있어요.
        </p>
        <div className="landing-in landing-in-d3">
          <LandingActions />
        </div>
      </div>
      <div className="landing-in landing-in-d4 w-full">
        <LandingHeroScene />
      </div>
      <div className="landing-in landing-in-d5 w-full">
        <LandingChipMarquee />
      </div>
    </section>
  )
}
