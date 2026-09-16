import LandingActions from "./LandingActions"
import Reveal from "./Reveal"

export default function LandingCtaBand() {
  return (
    <section id="landing-cta" className="px-6 py-16 sm:py-20">
      <Reveal>
        <div className="relative mx-auto w-full max-w-5xl rounded-[32px] bg-primary text-white">
          <div className="flex flex-col gap-6 px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
              <p className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">
                카드로 내보내기
              </p>
              <h2 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
                내 프로젝트, 카드로 내보낼까요?
              </h2>
              <p className="text-base/relaxed break-keep text-white/80">
                아직이면 다른 사람 카드부터 둘러봐요.
              </p>
            </div>
          </div>
          <TicketPerforation />
          <div className="flex justify-center px-6 py-8 sm:px-12">
            <LandingActions tone="onBrand" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function TicketPerforation() {
  return (
    <div aria-hidden="true" className="relative h-6">
      <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-white/35" />
      <span className="absolute top-1/2 left-0 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
      <span className="absolute top-1/2 right-0 size-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
    </div>
  )
}
