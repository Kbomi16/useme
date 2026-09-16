import LandingActions from "./LandingActions"
import LandingChipMarquee from "./LandingChipMarquee"
import LandingHeroScene from "./LandingHeroScene"

export default function LandingHero() {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-5xl content-center gap-10 px-6 pt-12 pb-10 sm:pt-16 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="flex flex-col items-start gap-8 text-left lg:-translate-y-10">
        <p className="landing-in text-primary text-[15px] font-semibold">
          useMe에서는
        </p>
        <h1 className="landing-in landing-in-d1 text-[36px] leading-[1.22] font-bold tracking-tight break-keep sm:text-[48px]">
          링크만 보내지 말고,
          <br />
          써 보라고 해요.
        </h1>
        <p className="landing-in landing-in-d2 text-muted-foreground max-w-md text-[17px] leading-relaxed break-keep">
          토이프로젝트를 한 장짜리 어필 카드로 만들어요.
          <br />
          단톡에 그 장을 보내면, 온 사람이 바로 눌러서 써 볼 수 있어요.
        </p>
        <div className="landing-in landing-in-d3">
          <LandingActions className="items-start" />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2 lg:mt-16 lg:translate-y-8">
        <div className="landing-in landing-in-d4 w-full">
          <LandingHeroScene />
        </div>
        <div className="landing-in landing-in-d5 w-full">
          <LandingChipMarquee />
        </div>
      </div>
    </section>
  )
}
