import { cn } from "@workspace/ui/lib/utils"

type SectionWrapperProps = React.ComponentProps<"section">

export default function SectionWrapper({
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl px-2 py-12 md:px-4 md:py-24",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
