import { Fragment } from "react"

interface StackBandProps {
  stack: string[]
}

export default function StackBand({ stack }: Readonly<StackBandProps>) {
  return (
    <div className="overflow-hidden bg-accent text-on-accent">
      <div className="mx-auto flex max-w-[1360px] flex-wrap gap-x-7 gap-y-2 px-5 py-[18px] font-mono text-sm font-medium tracking-[0.06em] uppercase sm:px-10">
        {stack.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && <span aria-hidden="true">/</span>}
            <span>{item}</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
