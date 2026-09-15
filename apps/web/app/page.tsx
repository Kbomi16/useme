import LandingCtaBand from "./_components/LandingCtaBand"
import LandingHero from "./_components/LandingHero"
import LandingProblem from "./_components/LandingProblem"
import LandingSamples from "./_components/LandingSamples"
import LandingSteps from "./_components/LandingSteps"

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-6 py-12 sm:py-16">
      <LandingHero />
      <LandingProblem />
      <LandingSteps />
      <LandingSamples />
      <LandingCtaBand />
    </main>
  )
}
