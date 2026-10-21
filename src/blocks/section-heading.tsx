import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  heading: string
  caption: string
  className?: string
}

export default function SectionHeading({
  heading,
  caption,
  className,
}: Readonly<SectionHeadingProps>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-4 pb-8",
        className,
      )}
    >
      <h2 className="text-[clamp(48px,6vw,88px)] leading-none font-extrabold tracking-[-0.035em]">
        {heading}
      </h2>
      <p className="font-mono text-sm text-muted">{caption}</p>
    </div>
  )
}
