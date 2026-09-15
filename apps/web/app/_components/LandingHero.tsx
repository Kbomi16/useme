import HeroArt from "./HeroArt"
import LandingActions from "./LandingActions"
import Reveal from "./Reveal"

export default function LandingHero() {
  return (
    <section className="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:py-16">
      <Reveal className="flex flex-col gap-6" immediate>
        <p className="text-primary text-[15px] font-semibold">useMe</p>
        <h1 className="text-[36px] leading-[1.25] font-bold tracking-tight break-keep sm:text-[44px]">
          링크만 보내지 말고,
          <br />
          써 보라고 해요.
        </h1>
        <p className="text-muted-foreground max-w-md text-[17px] leading-relaxed break-keep">
          토이프로젝트를 한 장짜리 어필 카드로 만들어요. 단톡에 그 장을 보내면,
          온 사람이 바로 눌러서 써 볼 수 있어요.
        </p>
        <LandingActions />
      </Reveal>
      <Reveal delay={0.12} immediate>
        <HeroArt
          src="/illustrations/hero-invite.png"
          alt="어필 카드를 들고 있는 사람"
        />
      </Reveal>
    </section>
  )
}
