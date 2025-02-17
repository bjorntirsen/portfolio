import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fetchProjectsWithCoverImage } from "@/utils/fetch-projects"
import { ProjectGrid } from "@/components/project-card"

export default async function Page() {
  const projects = await fetchProjectsWithCoverImage()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="grow container mx-auto px-4 py-8">
        <section id="about" className="mb-12">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src="/profile.jpeg"
                alt="Björn Tirsén"
                className="object-cover"
              />
              <AvatarFallback>BT</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">Björn Tirsén</h1>
            <p className="text-xl text-muted-foreground">
              Full Stack Developer
            </p>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg mb-4">
              Hello! I&#39;m a passionate full stack developer with 3 years of
              experience in building web applications. I specialize in React,
              Node.js, and everything connected to the web.
            </p>
            <p className="text-lg">
              When I&#39;m not coding, I like to spend time with the family, run
              and lift weights, read and watch movies.
            </p>
          </div>
        </section>

        <section id="projects" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">All Projects</h2>
          <ProjectGrid projects={projects} />
        </section>

        <section id="contact" className="text-center">
          <h2 className="text-2xl font-bold mb-6">Let&#39;s Connect</h2>
          <p className="mb-6">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link
                href="https://github.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://linkedin.com/in/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Björn Tirsén. All rights reserved.
      </footer>
    </div>
  )
}
