import type { SampleAuthor } from "../../../_components/sampleProjects"

type ProjectAuthorProps = {
  author: SampleAuthor
}

export default function ProjectAuthor({ author }: ProjectAuthorProps) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="project-author">
      <h2
        id="project-author"
        className="scroll-mt-24 text-lg font-bold tracking-tight break-keep"
      >
        만든 사람
      </h2>
      <div className="flex items-start gap-3 rounded-3xl bg-muted/80 px-4 py-4">
        <span
          aria-hidden
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground ring-1 ring-black/5"
        >
          {author.name.slice(0, 1)}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-sm font-semibold">{author.name}</p>
          <p className="text-sm/relaxed break-keep text-muted-foreground">
            {author.bio}
          </p>
        </div>
      </div>
    </section>
  )
}
