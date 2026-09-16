# Routes — apps/web (Next.js App Router)

No separate router config. File-based routes under `apps/web/app/`.

Shared layout: `apps/web/app/layout.tsx` — `AppHeader` + `{children}` inside `min-h-svh` flex column. No footer.

| URL | File | Layout | Summary |
| --- | --- | --- | --- |
| `/` | `apps/web/app/page.tsx` | Root + AppHeader | Marketing landing: hero → problem → card explain → steps → samples → feedback → **CTA band** |
| `/discover` | `apps/web/app/discover/page.tsx` | Root + AppHeader | Placeholder discover page (“다른 사람 프로젝트는 여기서 보여요”) |

Landing page composition (`page.tsx`):

```tsx
<main className="flex flex-1 flex-col">
  <LandingHero />
  <LandingProblem />
  <LandingCardExplain />
  <LandingSteps />
  <LandingSamples />
  <LandingFeedback />
  <LandingCtaBand />
</main>
```

CTA band is the last section: purple rounded rectangle, centered copy, two actions (publish toast / link to `/discover`).
