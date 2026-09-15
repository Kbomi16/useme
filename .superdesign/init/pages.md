# Page dependency trees

## / (Landing)

Entry: `apps/web/app/page.tsx`

Dependencies:

- `apps/web/app/_components/LandingHero.tsx`
  - `apps/web/app/_components/LandingActions.tsx`
    - `packages/ui/src/components/button.tsx`
    - `packages/ui/src/components/sonner.tsx`
    - `packages/ui/src/lib/utils.ts`
  - `apps/web/app/_components/LandingChipMarquee.tsx`
  - `apps/web/app/_components/LandingHeroScene.tsx`
- `apps/web/app/_components/LandingProblem.tsx`
  - `apps/web/app/_components/Reveal.tsx`
  - `apps/web/app/_components/sampleProjects.ts`
- `apps/web/app/_components/LandingCardExplain.tsx`
  - `apps/web/app/_components/Reveal.tsx`
- `apps/web/app/_components/LandingSteps.tsx`
  - `packages/ui/src/lib/utils.ts`
- `apps/web/app/_components/LandingSamples.tsx`
  - `apps/web/app/_components/AppealCard.tsx`
  - `apps/web/app/_components/Reveal.tsx`
  - `apps/web/app/_components/sampleProjects.ts`
- `apps/web/app/_components/LandingFeedback.tsx`
  - `apps/web/app/_components/Reveal.tsx`
  - `packages/ui/src/components/button.tsx`
  - `packages/ui/src/lib/utils.ts`
- `apps/web/app/_components/LandingCtaBand.tsx`  ← current design target
  - `apps/web/app/_components/LandingActions.tsx`
  - `apps/web/app/_components/Reveal.tsx`
- Layout: `apps/web/app/layout.tsx`
  - `apps/web/components/common/AppHeader.tsx`
    - `apps/web/components/common/Logo.tsx`
    - `apps/web/components/common/ThemeToggle.tsx`
  - `packages/ui/src/styles/globals.css`

### LandingCtaBand render (actual JSX)

Centered section `px-6 py-16 sm:py-20`. Inner: `max-w-5xl`, `rounded-[32px]`, `bg-primary`, white text, `px-6 py-14 sm:px-12`, `gap-6`, text-center.

- H2: `내 프로젝트, 카드로 내보낼까요?` — 28/34px bold
- P: `아직이면 다른 사람 프로젝트 카드부터 보세요.` — 16px white/80
- `LandingActions tone="onBrand"`: white filled button `내 프로젝트 올려보기` + outline `둘러보기` linking to `/discover`

## /discover

Entry: `apps/web/app/discover/page.tsx`

Dependencies:

- Layout header/logo/theme as above
- Placeholder copy only; no cards yet
