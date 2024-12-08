import { createClient } from "@supabase/supabase-js"
import { fetchProjects, OldAPIProject } from "./script-utils"

async function updateProjectDates(projects: OldAPIProject[]) {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env
  if (!SUPABASE_URL) throw new Error("Missing Supabase URL")
  if (!SUPABASE_KEY) throw new Error("Missing Supabase Key")
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  for (const project of projects) {
    const { slug, dateFirstCompleted } = project

    // Ensure the date exists
    if (!dateFirstCompleted) {
      console.warn(`Skipping project with slug: ${slug}, no dateFirstCompleted`)
      continue
    }

    // Update the created_at field for the project
    const { error } = await supabase
      .from("projects")
      .update({ created_at: dateFirstCompleted })
      .eq("slug", slug)

    if (error) {
      console.error(
        `Failed to update created_at for project with slug: ${slug}`,
        error,
      )
    } else {
      console.log(
        `Successfully updated created_at for project with slug: ${slug}`,
      )
    }
  }
}

// Main function
;(async () => {
  try {
    console.log(`Running update-data at ${new Date().toLocaleString("sv-SE")}`)
    const projects = await fetchProjects()
    if (!projects || projects.length === 0) throw new Error("No projects found")
    await updateProjectDates(projects)
  } catch (error) {
    console.error("Error in main function:", error)
  }
})()
