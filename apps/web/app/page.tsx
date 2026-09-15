import LandingCardExplain from "./_components/LandingCardExplain"
import LandingCtaBand from "./_components/LandingCtaBand"
import LandingHero from "./_components/LandingHero"
import LandingProblem from "./_components/LandingProblem"
import LandingSamples from "./_components/LandingSamples"
import LandingSteps from "./_components/LandingSteps"

export default function Page() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingHero />
      <LandingProblem />
      <LandingCardExplain />
      <LandingSteps />
      <LandingSamples />
      <LandingCtaBand />
    </main>
  )
}
