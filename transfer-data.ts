import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

export interface OldAPIProject {
  _id: string;
  imageCoverUrl: string;
  images: string[];
  title: string;
  subtitle: string;
  description: string;
  dateFirstCompleted: string;
  siteLink: string;
  whatILearned: WhatIlearned[];
  githubRepo: string;
  slug: string;
  imageCoverFilename: string;
  techniquesUsed?: string;
  image?: string;
}

interface WhatIlearned {
  icons: string[];
  _id: string;
  paragraph?: string;
}

async function saveToSupabase(projects: OldAPIProject[]) {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env;
  if (!SUPABASE_URL) throw new Error("Missing Supabase URL");
  if (!SUPABASE_KEY) throw new Error("Missing Supabase Key");
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  for (const project of projects) {
    const {
      title,
      subtitle,
      description,
      dateFirstCompleted,
      slug,
      images,
      imageCoverUrl,
      whatILearned,
    } = project;

    // Convert `whatILearned` to Markdown
    const lessonsMarkdown = whatILearned
      .map((lesson) => lesson.paragraph || "")
      .join("\n\n");

    // Insert the project into the `projects` table
    const { data: insertedProject, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          title,
          subtitle,
          description,
          slug,
          lessons_learned: lessonsMarkdown,
          created_at: new Date().toISOString(),
        },
      ])
      .select("id") // Select the generated ID for the project
      .single();

    if (projectError) {
      console.error(
        `Failed to insert project with slug: ${slug}`,
        projectError
      );
      continue;
    }

    const projectId = insertedProject.id;

    // Prepare image records for the `images` table
    const imageRecords = images.map((imageUrl, index) => ({
      project_id: projectId,
      image_url: imageUrl,
      alt: `Image ${index + 1} for project ${title}`,
      type: "regular",
      created_at: new Date().toISOString(),
    }));

    // Add cover image to the `images` table
    if (imageCoverUrl) {
      imageRecords.unshift({
        project_id: projectId,
        image_url: imageCoverUrl,
        alt: `Cover image for project ${title}`,
        type: "cover",
        created_at: new Date().toISOString(),
      });
    }

    // Insert the images into the `images` table
    const { error: imagesError } = await supabase
      .from("images")
      .insert(imageRecords);

    if (imagesError) {
      console.error(
        `Failed to insert images for project with slug: ${slug}`,
        imagesError
      );
    } else {
      console.log(`Inserted images for project with slug: ${slug}`);
    }
  }
}

export async function fetchProjects() {
  interface Response {
    status: string;
    results: number;
    data: Data;
  }

  interface Data {
    data: OldAPIProject[];
  }

  const url = process.env.PORTFOLIO_API_URL;
  if (!url) throw new Error("PORTFOLIO_API_URL is not set");
  const response = await fetch(url);
  const data: Response = await response.json();
  if (data.status !== "success") {
    throw new Error("Failed to fetch API data");
  }
  return data.data.data;
}

// Main function
(async () => {
  try {
    console.log(
      `Running transfer-data at ${new Date().toLocaleString("sv-SE")}`
    );
    const projects = await fetchProjects();
    if (!projects || projects.length === 0)
      throw new Error("No projects found");
    await saveToSupabase(projects);
  } catch (error) {
    console.error("Error in main function:", error);
  }
})();
