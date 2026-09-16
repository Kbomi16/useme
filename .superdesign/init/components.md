# Shared UI primitives

Library: shadcn/ui on Base UI, package `@workspace/ui`. Web app also has `apps/web/components/common/` for layout chrome.

## Button

Path: `packages/ui/src/components/button.tsx`

Primary CTA uses `size="lg"` then overrides to `h-12 rounded-2xl px-6 text-[16px] font-semibold`. On-brand (on purple): white bg, `text-primary`. Outline on-brand: transparent, `border-white/40`, white text.

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## Card

Path: `packages/ui/src/components/card.tsx`

Landing appeal cards are custom (`AppealCard`) with `rounded-[22px]`, not this primitive. Included for completeness.

```tsx
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)]",
        className
      )}
      {...props}
    />
  )
}
```

## Input

Path: `packages/ui/src/components/input.tsx`

```tsx
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}
```

## Badge

Path: `packages/ui/src/components/badge.tsx`

`rounded-4xl`, `h-5`, variants default/secondary/outline/ghost. Appeal cards use a custom pill (`bg-secondary text-secondary-foreground rounded-full`) for 왜/뭘/얼마나, not this Badge.

## Separator

Path: `packages/ui/src/components/separator.tsx`

`bg-border` 1px horizontal/vertical.

## Landing CTA source (target)

Path: `apps/web/app/_components/LandingCtaBand.tsx`

```tsx
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
```

Path: `apps/web/app/_components/LandingActions.tsx` (onBrand)

White filled `h-12 rounded-2xl` “내 프로젝트 올려보기” + outline “둘러보기”. Stacks column on mobile, row from `sm`.
