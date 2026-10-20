import { getSql } from "./db"

interface IImage {
  id: string
  image_url: string
  alt?: string
  type: "cover" | "regular"
}

export interface ProjectWithCoverImage {
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

type ProjectRow = Omit<ProjectWithCoverImage, "created_at" | "coverImage"> & {
  created_at: Date
}

export async function fetchProjectsWithCoverImage(): Promise<
  ProjectWithCoverImage[]
> {
  let projects: ProjectRow[]
  try {
    const sql = getSql()
    projects = await sql<ProjectRow[]>`
      select
        p.*,
        coalesce(
          (
            select json_agg(
              json_build_object(
                'id', i.id,
                'image_url', i.image_url,
                'alt', i.alt,
                'type', i.type
              )
              order by i.created_at
            )
            from images i
            where i.project_id = p.id
          ),
          '[]'
        ) as images
      from projects p
      order by p.created_at desc
    `
  } catch (error) {
    console.error("Error fetching projects with images:", error)
    return []
  }

  return projects.map((project) => {
    const coverImage = project.images.find((image) => image.type === "cover")
    const filteredImages = project.images.filter(
      (image) => image.type !== "cover",
    )

    return {
      ...project,
      created_at: project.created_at.toISOString(),
      images: filteredImages,
      coverImage,
    }
  })
}
