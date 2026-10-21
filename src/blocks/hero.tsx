import Image from "next/image"
import type { SiteCopy } from "@/content"
import { cn } from "@/lib/utils"

interface HeroProps {
  hero: SiteCopy["hero"]
}

export default function Hero({ hero }: Readonly<HeroProps>) {
  const nameLines = hero.name.split(/\s+/)

  return (
    <section
      id="top"
      className="mx-auto max-w-[1360px] border-b border-line px-5 pt-16 pb-24 sm:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-12">
        <div className="min-w-0 flex-[1_1_560px]">
          <p className="mb-6 font-mono text-sm text-accent-ink">
            {hero.eyebrow}
          </p>
          <h1 className="text-[clamp(72px,12.5vw,200px)] leading-[0.86] font-extrabold tracking-[-0.045em]">
            {nameLines.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i === nameLines.length - 1 && (
                  <span className="text-accent">.</span>
                )}
              </span>
            ))}
          </h1>
        </div>
        <div className="relative aspect-[4/5] flex-[0_1_300px] overflow-hidden rounded bg-card max-sm:basis-[70%]">
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            fill
            priority
            sizes="300px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-18 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-12">
        <p className="max-w-[34ch] text-[clamp(22px,2.2vw,32px)] leading-[1.3]">
          {hero.intro}
        </p>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-3 border-t border-line pt-5 font-mono text-sm">
          {hero.facts.map((fact) => (
            <div key={fact.id} className="contents">
              <dt className="text-muted">{fact.term}</dt>
              <dd
                className={cn(fact.highlight && "font-medium text-accent-ink")}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
