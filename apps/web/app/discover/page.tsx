import {
  featuredProject,
  shelfProjects,
} from "../_components/sampleProjects"
import DiscoverBrowse from "./_components/DiscoverBrowse"

export default function DiscoverPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 md:px-6 md:py-16">
      <DiscoverBrowse featured={featuredProject} shelf={shelfProjects} />
    </main>
  )
}
