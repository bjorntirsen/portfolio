import "dotenv/config"

export interface OldAPIProject {
  _id: string
  imageCoverUrl: string
  images: string[]
  title: string
  subtitle: string
  description: string
  dateFirstCompleted: string
  siteLink: string
  whatILearned: WhatIlearned[]
  githubRepo: string
  slug: string
  imageCoverFilename: string
  techniquesUsed?: string
  image?: string
}

interface WhatIlearned {
  icons: string[]
  _id: string
  paragraph?: string
}

export async function fetchProjects() {
  interface Response {
    status: string
    results: number
    data: Data
  }

  interface Data {
    data: OldAPIProject[]
  }

  const url = process.env.PORTFOLIO_API_URL
  if (!url) throw new Error("PORTFOLIO_API_URL is not set")
  const response = await fetch(url)
  const data: Response = await response.json()
  if (data.status !== "success") {
    throw new Error("Failed to fetch API data")
  }
  return data.data.data
}
