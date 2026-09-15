import LandingActions from "./LandingActions"
import Reveal from "./Reveal"

export default function LandingCtaBand() {
  return (
    <section className="px-6 pb-20">
      <Reveal>
        <div className="bg-primary mx-auto flex w-full max-w-5xl flex-col items-start gap-6 rounded-[28px] px-6 py-12 text-white sm:px-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[32px]">
              한 장 만들어서 뿌려 보세요.
            </h2>
            <p className="text-[16px] leading-relaxed text-white/80 break-keep">
              구경부터 해도 돼요. 둘러보기에서 다른 사람 카드가 나와요.
            </p>
          </div>
          <LandingActions tone="onBrand" />
        </div>
      </Reveal>
    </section>
  )
}
