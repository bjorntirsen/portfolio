import { createClient } from "@supabase/supabase-js"

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

export async function fetchProjectsWithCoverImage(): Promise<
  ProjectWithCoverImage[]
> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
  )

  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      images (
        id,
        image_url,
        alt,
        type
      )
    `,
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects with images:", error)
    return []
  }

  return projects.map((project) => {
    const coverImage = project.images?.find(
      (image: IImage) => image.type === "cover",
    )
    const filteredImages = project.images?.filter(
      (image: IImage) => image.type !== "cover",
    )

    return { ...project, images: filteredImages, coverImage }
  })
}
