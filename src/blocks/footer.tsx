import type { SiteCopy } from "@/content"

interface FooterProps {
  footer: SiteCopy["footer"]
}

export default function Footer({ footer }: Readonly<FooterProps>) {
  return (
    <footer className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-4 px-5 pt-8 pb-12 font-mono text-[13px] text-muted sm:px-10">
      <span>
        © {new Date().getFullYear()} {footer.copyright}
      </span>
      <span>{footer.colophon}</span>
    </footer>
  )
}
