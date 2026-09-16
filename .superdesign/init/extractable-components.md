# Extractable Superdesign components

## AppHeader

- Source: `apps/web/components/common/AppHeader.tsx`
- Category: layout
- Description: Sticky top nav with logo, Discover link, theme toggle
- Extractable props: activeItem (string, default: "home")
- Hardcoded: Logo images, “둘러보기” label, hover/focus classes, max-w-5xl padding
- Note: Not required for isolated CTA-band drafts (CTA has no chrome/logo)

## Logo

- Source: `apps/web/components/common/Logo.tsx`
- Category: layout
- Description: Light/dark PNG lockup
- Extractable props: none
- Hardcoded: `/brand/logo-light.png`, `/brand/logo-dark.png`, h-8

## LandingActions

- Source: `apps/web/app/_components/LandingActions.tsx`
- Category: basic
- Description: Dual CTA — publish project + browse discover
- Extractable props: tone (string, default: "default") — `default` vs `onBrand`
- Hardcoded: button copy “내 프로젝트 올려보기”, “둘러보기”, sizes, radii

## AppealCard

- Source: `apps/web/app/_components/AppealCard.tsx`
- Category: basic
- Description: Sample project appeal card (왜/뭘/얼마나 + 써 보기)
- Extractable props: none for CTA variants unless a mock card is shown
- Hardcoded: slot labels, example badge, button label

## Button

- Source: `packages/ui/src/components/button.tsx`
- Category: basic
- Description: shadcn/Base UI button (skip extraction; inline in drafts)
