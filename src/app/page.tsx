import About from "@/blocks/about"
import Header from "@/components/header"
import Projects from "@/blocks/projects"
import Contact from "@/blocks/contact"

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--accent-3)]">
      <Header />
      <main className="container mx-auto grow px-4 py-8">
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="text-muted-foreground border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} Björn Tirsén. All rights reserved.
      </footer>
    </div>
  )
}
