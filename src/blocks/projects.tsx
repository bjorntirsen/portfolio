import { ProjectCard } from "@/components/project-card"
import { fetchProjectsWithCoverImage } from "@/utils/fetch-projects"
import { Heading } from "@radix-ui/themes"

export default async function Projects() {
  const projects = await fetchProjectsWithCoverImage()
  return (
    <section id="projects" className="mb-12">
      <Heading as="h2" size="5" mb="6" align="center">
        All Projects
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.id} />
        ))}
      </div>
    </section>
  )
}
