import About from "@/blocks/about"
import Header from "@/components/header"
import Projects from "@/blocks/projects"
import Contact from "@/blocks/contact"

export default async function Page() {
  return (
    <div className="min-h-screen bg-[var(--accent-3)] flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-8">
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Björn Tirsén. All rights reserved.
      </footer>
    </div>
  )
}
