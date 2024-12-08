import { createClient } from "@supabase/supabase-js"
import { fetchProjects, OldAPIProject } from "./script-utils"

async function updateProjectData(projects: OldAPIProject[]) {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env
  if (!SUPABASE_URL) throw new Error("Missing Supabase URL")
  if (!SUPABASE_KEY) throw new Error("Missing Supabase Key")
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  for (const project of projects) {
    const { slug, siteLink, githubRepo } = project

    // Ensure the slug exists
    if (!slug) {
      console.warn(`Skipping project without a slug`)
      continue
    }

    const updateFields: { live_url?: string; repo?: string } = {}

    if (siteLink) {
      updateFields.live_url = siteLink
    }

    if (githubRepo) {
      updateFields.repo = githubRepo
    }

    // Skip update if no fields need updating
    if (Object.keys(updateFields).length === 0) {
      console.warn(`Skipping project with slug: ${slug}, no fields to update`)
      continue
    }

    // Update the project in Supabase
    const { error } = await supabase
      .from("projects")
      .update(updateFields)
      .eq("slug", slug)

    if (error) {
      console.error(`Failed to update project with slug: ${slug}`, error)
    } else {
      console.log(`Successfully updated project with slug: ${slug}`)
    }
  }
}

// Main function
;(async () => {
  try {
    console.log(`Running update-data at ${new Date().toLocaleString("sv-SE")}`)
    const projects = await fetchProjects()
    if (!projects || projects.length === 0) throw new Error("No projects found")
    await updateProjectData(projects)
  } catch (error) {
    console.error("Error in main function:", error)
  }
})()
