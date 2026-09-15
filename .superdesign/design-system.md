# useMe design system

## Product

useMe is a Korean product for toy-project makers. It turns a GitHub/demo link into a one-page **appeal card** (왜 / 뭘 / 얼마나) that you drop into a group chat so people actually try the thing and leave feedback.

Audience: indie makers, students, side-project builders sharing work in KakaoTalk/Slack/Twitter.

Primary job of the landing CTA: after reading the page, either **upload my project** or **browse other people's cards**.

## Voice

Conversational Korean, sentence case, concrete. No English marketing jargon. Copy names what the person does: “내 프로젝트 올려보기”, “둘러보기”, “써 보기”. `break-keep` on Korean headings.

Current CTA copy (keep verbatim unless a variation explicitly rewrites structure, not wording):

- Headline: 내 프로젝트, 카드로 내보낼까요?
- Body: 아직이면 다른 사람 프로젝트 카드부터 보세요.
- Primary: 내 프로젝트 올려보기
- Secondary: 둘러보기

## Color

Use only these:

- Primary purple `#7960A9` / `oklch(0.545 0.113 298.35)` — logo, filled bands, primary buttons
- White background, near-black violet foreground `oklch(0.21 0.004 286.06)`
- Secondary lilac wash `oklch(0.96 0.014 300)` with deep-purple text
- Muted cool gray for illustration wells
- White-on-primary for CTA band; secondary text `white/80`; outline `white/40`

Do not introduce teal, neon, gold, serif display faces, or unrelated accent hues.

## Type

- UI/body: Pretendard Variable
- Fallback sans: Geist
- Tracking: `-0.02em` body, `tracking-tight` headlines
- CTA H2: 28px mobile / 34px desktop, bold, leading-snug
- CTA body: 16px, leading-relaxed
- Buttons: 16px semibold

## Layout

- Content width `max-w-5xl`, page padding `px-6`
- Section padding `py-16 sm:py-20` or `sm:py-24`
- Large wells `rounded-[32px]` or `rounded-[28px]`
- Buttons `h-12 rounded-2xl px-6`
- Appeal cards `rounded-[22px]` with light shadow + hairline ring

## Signature artifact

The appeal card itself (phone-like frame, 왜/뭘/얼마나 pills, “써 보기” bar). CTA redesigns should feel like *exporting that card*, not a generic SaaS banner.

## Motion

Existing landing uses GSAP Reveal (fade/slide up once). Do not invent extra animation in static drafts.

## Constraints

- Korean only
- Light theme for drafts unless asked
- No fake dashboards, no stock photos of people, no generic gradient mesh unrelated to the card
- Secondary CTA always goes to 둘러보기 / discover, not signup
