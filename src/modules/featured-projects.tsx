import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"

interface Props {
  foo?: string
}

export default function FeaturedProjects({ foo = "bar" }: Props) {
  return (
    <section id="featured-projects" className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "E-commerce Platform",
            description:
              "A full-stack e-commerce solution built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, and order processing.",
            tags: ["Next.js", "Node.js", "MongoDB"],
          },
          {
            title: "Task Management App",
            description:
              "A React-based task management application with real-time updates. Utilizes Firebase for backend services and authentication.",
            tags: ["React", "Firebase", "Material-UI"],
          },
          {
            title: "Weather Dashboard",
            description:
              "A responsive weather dashboard that provides real-time weather information and forecasts. Built with Vue.js and integrates with a third-party weather API.",
            tags: ["Vue.js", "API Integration", "Chart.js"],
          },
        ].map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
