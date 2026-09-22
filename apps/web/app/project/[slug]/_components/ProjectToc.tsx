const tocItems = [
  { href: "#project-overview", label: "한눈에" },
  { href: "#project-story-why", label: "왜 이런 걸 만들었어요" },
  { href: "#project-story-what", label: "뭘 하나요" },
  { href: "#project-story-how", label: "얼마나 달라지나요" },
  { href: "#project-steps", label: "이렇게 써요" },
  { href: "#project-audience", label: "이런 팀에 맞아요" },
  { href: "#project-author", label: "만든 사람" },
  { href: "#project-feedback", label: "받은 피드백" },
] as const

export default function ProjectToc() {
  return (
    <nav
      aria-label="목차"
      className="hidden rounded-3xl bg-muted/60 px-4 py-4 lg:sticky lg:top-24 lg:block lg:w-44 lg:shrink-0 lg:bg-transparent lg:px-0 lg:py-0"
    >
      <p className="mb-3 text-[13px] font-bold tracking-tight">목차</p>
      <ol className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-1">
        {tocItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-baseline gap-2 rounded-lg px-1 py-1 text-[13px]/snug break-keep text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
