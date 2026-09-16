# Theme tokens — useMe (web)

## Part 1 — Compact token summary

Stack: Next.js App Router + Tailwind CSS v4 (`@theme inline`) + shadcn/ui (Base UI) + Pretendard Variable.

### Color (light `:root`)

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | white |
| `--foreground` | `oklch(0.21 0.004 286.06)` | near-black violet |
| `--primary` | `oklch(0.545 0.113 298.35)` | logo purple ≈ `#7960A9` |
| `--primary-foreground` | `oklch(0.985 0 0)` | white |
| `--secondary` | `oklch(0.96 0.014 300)` | lilac wash |
| `--secondary-foreground` | `oklch(0.35 0.056 296.33)` | deep purple |
| `--muted` | `oklch(0.965 0.004 250)` | cool gray wash |
| `--muted-foreground` | `oklch(0.51 0.02 286)` | |
| `--accent` | `oklch(0.955 0.018 298)` | |
| `--accent-foreground` | `oklch(0.35 0.056 296.33)` | |
| `--destructive` | `oklch(0.577 0.245 27.325)` | |
| `--border` / `--input` | `oklch(0.91 0.012 286)` | |
| `--ring` | same as primary | |
| `--card` | white | |
| `--radius` | `0.625rem` | |

Landing CTA band uses `bg-primary` + `text-white`, secondary copy `text-white/80`, primary button on the band is white/`text-primary`, outline is `border-white/40`.

### Typography

- Body/UI: `"Pretendard Variable", Pretendard, var(--font-sans), sans-serif`
- `--font-sans`: Geist (Next font variable)
- `--font-mono`: Geist Mono
- Body `letter-spacing: -0.02em`
- Korean: `break-keep` on headlines and body
- Landing H1: 36px / 52px sm, bold, tracking-tight, leading 1.22
- Section H2: 28px / 34px sm, bold, tracking-tight, leading-snug
- Body: 16–17px, leading-relaxed
- CTA H2: 28px / 34px, white
- CTA body: 16px, white/80

### Spacing / layout

- Page max width: `max-w-5xl` centered, `px-6`
- Section vertical: `py-16 sm:py-20` (CTA) or `py-16 sm:py-24`
- CTA inner: `gap-6`, `px-6 py-14 sm:px-12`
- CTA radius: `rounded-[32px]`
- Buttons: `h-12 rounded-2xl px-6 text-[16px] font-semibold`

### Shadows / radius scale

- `--radius-sm` … `--radius-4xl` derived from `--radius`
- Appeal card: `rounded-[22px] shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5`

### Breakpoints

Default Tailwind (sm 640, md 768, lg 1024). Landing CTA buttons stack on mobile (`flex-col`) and go row on `sm`.

## Part 2 — Raw source

See `packages/ui/src/styles/globals.css` (no separate `tailwind.config`; Tailwind v4 CSS-first).

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-sans);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --font-sans: var(--font-sans);
}

:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.21 0.004 286.06);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.21 0.004 286.06);
    --primary: oklch(0.545 0.113 298.35);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.96 0.014 300);
    --secondary-foreground: oklch(0.35 0.056 296.33);
    --muted: oklch(0.965 0.004 250);
    --muted-foreground: oklch(0.51 0.02 286);
    --accent: oklch(0.955 0.018 298);
    --accent-foreground: oklch(0.35 0.056 296.33);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.91 0.012 286);
    --input: oklch(0.91 0.012 286);
    --ring: oklch(0.545 0.113 298.35);
    --radius: 0.625rem;
}

.dark {
    --background: oklch(0.201 0.004 286.04);
    --foreground: oklch(0.979 0 0);
    --card: oklch(0.253 0.004 286.13);
    --primary: oklch(0.545 0.113 298.35);
    --primary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.276 0.015 286);
    --muted-foreground: oklch(0.72 0.015 286);
    --border: oklch(1 0 0 / 10%);
}

@layer base {
  body {
    font-family: "Pretendard Variable", Pretendard, var(--font-sans), sans-serif;
    letter-spacing: -0.02em;
  }
}
```
