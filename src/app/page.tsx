import { getContent } from "@/content"
import Header from "@/components/header"
import Hero from "@/blocks/hero"
import StackBand from "@/blocks/stack-band"
import Areas from "@/blocks/areas"
import Experience from "@/blocks/experience"
import About from "@/blocks/about"
import Projects from "@/blocks/projects"
import Archive from "@/blocks/archive"
import Contact from "@/blocks/contact"
import Footer from "@/blocks/footer"

export default async function Page() {
  const { site, areas, experience, projects, archive } = await getContent()

  return (
    <>
      <Header site={site} />
      <main>
        <Hero hero={site.hero} />
        <StackBand stack={site.stack} />
        <Areas copy={site.areas_section} areas={areas} />
        <Experience copy={site.experience_section} entries={experience} />
        <About about={site.about} />
        <Projects copy={site.projects_section} projects={projects}>
          <Archive copy={site.archive_section} items={archive} />
        </Projects>
        <Contact contact={site.contact} />
      </main>
      <Footer footer={site.footer} />
    </>
  )
}
