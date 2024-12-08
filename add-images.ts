import { createClient } from "@supabase/supabase-js"
import { fetchProjects, OldAPIProject } from "./transfer-data"

async function addImagesToProjects(projects: OldAPIProject[]) {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env
  if (!SUPABASE_URL) throw new Error("Missing Supabase URL")
  if (!SUPABASE_KEY) throw new Error("Missing Supabase Key")
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  for (const project of projects) {
    const { slug, imageCoverUrl, images, title } = project

    // Fetch the project ID using the slug
    const { data: projectRecord, error: fetchError } = await supabase
      .from("projects")
      .select("id, title")
      .eq("slug", slug)
      .single()

    if (fetchError || !projectRecord) {
      console.error(`Failed to find project with slug: ${slug}`, fetchError)
      continue
    }

    const projectId = projectRecord.id

    // Prepare image records
    const imageRecords = images.map((imageUrl, index) => ({
      project_id: projectId,
      image_url: imageUrl,
      alt: `Image ${index + 1} for project ${title}`,
      type: "regular",
    }))

    // Add cover image if provided
    if (imageCoverUrl) {
      imageRecords.unshift({
        project_id: projectId,
        image_url: imageCoverUrl,
        alt: `Cover image for project ${title}`,
        type: "cover",
      })
    }

    // Insert images into the `images` table
    const { error: insertError } = await supabase
      .from("images")
      .insert(imageRecords)

    if (insertError) {
      console.error(
        `Failed to insert images for project with slug: ${slug}`,
        insertError,
      )
    } else {
      console.log(`Successfully added images for project with slug: ${slug}`)
    }
  }
}

// Main function
;(async () => {
  try {
    console.log(`Running add-images at ${new Date().toLocaleString("sv-SE")}`)
    const projects = await fetchProjects()
    if (!projects || projects.length === 0) throw new Error("No projects found")
    await addImagesToProjects(projects)
  } catch (error) {
    console.error("Error in main function:", error)
  }
})()
