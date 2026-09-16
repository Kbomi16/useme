import LandingCardExplain from "./_components/LandingCardExplain"
import LandingCtaBand from "./_components/LandingCtaBand"
import LandingFeedback from "./_components/LandingFeedback"
import LandingHero from "./_components/LandingHero"
import LandingProblem from "./_components/LandingProblem"
import LandingSampleCta from "./_components/LandingSampleCta"
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
      <LandingFeedback />
      <LandingCtaBand />
      <LandingSampleCta />
    </main>
  )
}
