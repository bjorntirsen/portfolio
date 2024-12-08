import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface IImage {
  id: string
  image_url: string
  alt?: string
  type: "cover" | "regular"
}

interface ProjectWithCoverImage {
  id: string
  title: string
  subtitle: string
  description: string
  slug: string
  lessons_learned?: string
  created_at: string
  images: IImage[]
  coverImage?: IImage
}

export function ProjectCard({ project }: { project: ProjectWithCoverImage }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        {project.coverImage && (
          <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
            <Image
              src={project.coverImage.image_url}
              alt={project.coverImage.alt || project.title}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {new Date(project.created_at).toLocaleDateString("sv-SE")}
        </p>
        <p className="text-sm line-clamp-3">{project.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href={`/projects/${project.slug}`}>View Project</a>
        </Button>
        {project.lessons_learned && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Lessons Learned</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Lessons Learned</DialogTitle>
                <DialogDescription>
                  Key takeaways from the {project.title} project
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {project.lessons_learned}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
}

export function ProjectGrid({
  projects,
}: {
  projects: ProjectWithCoverImage[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
