import About from "@/blocks/about"
import Header from "@/components/header"
import Projects from "@/blocks/projects"
import Contact from "@/blocks/contact"

// Projects are read from Postgres per request. The database is only reachable
// on Coolify's internal network, which the image build has no access to.
export const dynamic = "force-dynamic"

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
