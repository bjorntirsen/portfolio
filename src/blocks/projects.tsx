import type { Project, SiteCopy } from "@/content"
import SectionHeading from "./section-heading"

interface ProjectsProps {
  copy: SiteCopy["projects_section"]
  projects: Project[]
  children?: React.ReactNode
}

// Archive is passed as children so it stays inside the Projects section
export default function Projects({
  copy,
  projects,
  children,
}: Readonly<ProjectsProps>) {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1360px] px-5 pb-30 sm:px-10"
    >
      <SectionHeading
        heading={copy.heading}
        caption={copy.caption}
        className="border-b border-line"
      />
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="flex min-h-[340px] flex-col gap-5 rounded border border-line bg-card p-8"
          >
            <div className="flex justify-between gap-4 font-mono text-[13px] text-muted">
              <span className="text-accent-ink">{project.label}</span>
              <span>
                {project.date} · {project.kind}
              </span>
            </div>
            <h3 className="text-[44px] leading-none font-extrabold tracking-[-0.03em]">
              {project.title}
            </h3>
            <p className="grow text-lg leading-normal text-body">
              {project.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line-strong px-2.5 py-1.5 font-mono text-xs text-body"
                >
                  {tag}
                </li>
              ))}
            </ul>
            {(project.repo_url || project.live_url) && (
              <div className="flex flex-wrap gap-6 border-t border-line pt-4 font-mono text-sm">
                {project.repo_url && (
                  <a href={project.repo_url}>{copy.repo_label}</a>
                )}
                {project.live_url && (
                  <a href={project.live_url}>{copy.live_label}</a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
      {children}
    </section>
  )
}
