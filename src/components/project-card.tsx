import Image from "next/image"
import {
  Box,
  Card,
  Text,
  Inset,
  Button,
  Flex,
  Theme,
  ThemeProps,
} from "@radix-ui/themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"

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
  repo?: string
  live_url?: string
}
interface ProjectCardProps {
  index: number
  project: ProjectWithCoverImage
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  function getAccentColor(index: number): ThemeProps["accentColor"] {
    const accentColors: ThemeProps["accentColor"][] = [
      "gold",
      "bronze",
      "brown",
      "yellow",
      "amber",
      "orange",
      "tomato",
      "red",
      "ruby",
      "crimson",
      "pink",
      "plum",
      "purple",
      "violet",
      "iris",
      "indigo",
      "blue",
      "cyan",
      "teal",
      "jade",
      "green",
      "grass",
      "lime",
      "mint",
      "sky",
    ]
    return accentColors[index % accentColors.length]
  }

  const color: ThemeProps["accentColor"] = "indigo"
  return (
    <Theme accentColor={getAccentColor(index)}>
      <Box className="w-full max-w-sm mx-auto bg-[var(--accent-3)]">
        <Card>
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            className="relative h-64 bg-gray-500"
          >
            {project.coverImage && (
              <Image
                src={project.coverImage.image_url}
                alt={project.coverImage.alt || project.title}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </Inset>
          <div className="h-2" />
          <Flex direction="column" gap="2">
            <Text size="3">{project.title}</Text>
            <Text size="2">{project.subtitle}</Text>
            <Text size="2">
              {new Date(project.created_at).toLocaleDateString("sv-SE")}
            </Text>
            <Text size="2">{project.description}</Text>
            <div className="flex flex-wrap gap-2">
              {project.repo && (
                <Button variant="outline" asChild>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repo <ExternalLink />
                  </a>
                </Button>
              )}
              {project.live_url && (
                <Button variant="outline" asChild>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Site <ExternalLink />
                  </a>
                </Button>
              )}
              {project.lessons_learned && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="solid">Lessons Learned</Button>
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
            </div>
          </Flex>
        </Card>
      </Box>
    </Theme>
  )
}

export function ProjectGrid({
  projects,
}: {
  projects: ProjectWithCoverImage[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
