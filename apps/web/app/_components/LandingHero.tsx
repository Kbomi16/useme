import { ChevronDownIcon } from "lucide-react"

import LandingActions from "./LandingActions"
import LandingChipMarquee from "./LandingChipMarquee"
import LandingHeroScene from "./LandingHeroScene"

export default function LandingHero() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col px-2 pt-12 pb-6 md:px-4 md:pt-16 md:pb-8">
      <div className="grid flex-1 content-center gap-10 py-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="flex flex-col items-start gap-8 text-left lg:-translate-y-12">
          <p className="landing-in text-[15px] font-semibold text-primary">
            useMe에서는
          </p>
          <h1 className="landing-in landing-in-d1 text-4xl/[1.22] font-bold tracking-tight break-keep sm:text-5xl/[1.22]">
            링크만 보내지 말고,
            <br />써 보라고 해요.
          </h1>
          <p className="landing-in landing-in-d2 max-w-md text-[17px]/relaxed break-keep text-muted-foreground">
            토이프로젝트를 한 장짜리 어필 카드로 만들어요.
            <br />
            단톡에 그 장을 보내면, 온 사람이 바로 눌러서 써 볼 수 있어요.
          </p>
          <div className="landing-in landing-in-d3">
            <LandingActions className="items-start" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2 lg:translate-y-10">
          <div className="landing-in landing-in-d4 w-full">
            <LandingHeroScene />
          </div>
          <div className="landing-in landing-in-d5 w-full">
            <LandingChipMarquee />
          </div>
        </div>
      </div>
      <LandingScrollCue />
    </section>
  )
}

function LandingScrollCue() {
  return (
    <div aria-hidden="true" className="landing-in landing-in-d5 mx-auto">
      <div className="landing-scroll-cue flex flex-col items-center -space-y-3 text-muted-foreground">
        <ChevronDownIcon className="size-8" />
      </div>
    </div>
  )
}
