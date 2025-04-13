import Image from "next/image"
import {
  Card,
  Dialog,
  Text,
  Inset,
  Button,
  Flex,
  Theme,
  ThemeProps,
  Heading,
} from "@radix-ui/themes"
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

  return (
    <Theme accentColor={getAccentColor(index)} asChild>
      <Card
        key={project.id}
        style={{ display: "flex" }}
        className="animate-rotate-y flex-col rounded-xl bg-[var(--accent-3)] p-4"
      >
        {project.coverImage && (
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            className="relative h-64 rounded-t-xl bg-gray-500"
          >
            <Image
              src={project.coverImage.image_url}
              alt={project.coverImage.alt || project.title}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 384px"
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </Inset>
        )}
        <Flex direction="column" flexGrow="1" p="2" minHeight="0">
          <Flex direction="column" flexGrow="1">
            <Heading as="h3" size="5" mt="4" mb="2">
              {project.title}
            </Heading>
            <Text weight="light" mb="1">
              {project.subtitle}
            </Text>
            <Text weight="light" mb="1">
              Created:{" "}
              {new Date(project.created_at).toLocaleDateString("sv-SE")}
            </Text>
            <Text size="2" mt="2">
              {project.description}
            </Text>
          </Flex>
          <div className="mt-4 flex flex-wrap gap-2">
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
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button variant="solid">Lessons Learned</Button>
                </Dialog.Trigger>
                <Dialog.Content asChild>
                  <div
                    className="max-w-[450px]"
                    style={{ backgroundColor: "var(--accent-2)" }}
                  >
                    <Dialog.Title>Lessons Learned</Dialog.Title>
                    <Dialog.Description>
                      Key takeaways from the {project.title} project
                    </Dialog.Description>
                    <Text as="p" className="text-muted-foreground text-sm">
                      {project.lessons_learned}
                    </Text>
                    <Dialog.Close>
                      <Button mt="4">Close</Button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Root>
            )}
          </div>
        </Flex>
      </Card>
    </Theme>
  )
}
