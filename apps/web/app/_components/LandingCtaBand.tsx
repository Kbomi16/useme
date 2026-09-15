import LandingActions from "./LandingActions"
import Reveal from "./Reveal"

export default function LandingCtaBand() {
  return (
    <section className="px-6 py-16 sm:py-20">
      <Reveal>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-[32px] bg-primary px-6 py-14 text-center text-white sm:px-12">
          <div className="flex max-w-lg flex-col gap-3">
            <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
              내 프로젝트, 카드로 내보낼까요?
            </h2>
            <p className="text-[16px] leading-relaxed text-white/80 break-keep">
              아직이면 다른 사람 프로젝트 카드부터 보세요.
            </p>
          </div>
          <div className="flex justify-center">
            <LandingActions tone="onBrand" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
