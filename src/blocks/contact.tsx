import type { SiteCopy } from "@/content"

interface ContactProps {
  contact: SiteCopy["contact"]
}

export default function Contact({ contact }: Readonly<ContactProps>) {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12 px-5 pt-30 pb-24 sm:px-10">
        <p className="font-mono text-sm text-muted">{contact.caption}</p>
        <h2 className="text-[clamp(64px,11vw,176px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
          {contact.heading}
          <span className="text-accent">.</span>
        </h2>
        <p className="max-w-[40ch] text-[clamp(20px,2vw,26px)] leading-[1.4] text-body">
          {contact.text}
        </p>
        <div className="flex flex-col border-t border-fg">
          {contact.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex items-center justify-between gap-4 border-b border-line py-7 text-[clamp(28px,3.5vw,48px)] font-semibold no-underline"
            >
              <span className="min-w-0 break-words">{link.label}</span>
              <span aria-hidden="true">{link.arrow}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
