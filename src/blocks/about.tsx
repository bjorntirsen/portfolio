import type { SiteCopy } from "@/content"

interface AboutProps {
  about: SiteCopy["about"]
}

export default function About({ about }: AboutProps) {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1360px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-12 px-5 py-30 sm:px-10"
    >
      <p className="font-mono text-sm text-muted">{about.caption}</p>
      <div className="flex flex-col gap-6 text-xl leading-[1.55] text-body">
        <p className="text-[30px] leading-[1.25] font-semibold text-fg">
          {about.lead}
        </p>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-[13px] tracking-[0.08em] text-muted uppercase">
          {about.off_the_clock_heading}
        </h3>
        <ul className="flex flex-col text-[22px]">
          {about.off_the_clock.map((item) => (
            <li key={item} className="border-b border-line py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
