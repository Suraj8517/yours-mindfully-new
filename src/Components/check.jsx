import { useContext, useState } from 'react'
import { Wrap, It, Kicker, Lede, Sec } from './utils/heroUtils'
import Btn from './utils/btn'
import { img } from './utils/img'
import { Q, R } from './utils/content/check'
import { Ctx } from './utils/ctx'

const linkCls =
  'cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-inherit underline underline-offset-[3px] transition-colors hover:text-rose-lite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-lite rounded'

const headingCls =
  'm-0 max-w-[16ch] text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-onever'

function ProgressBar({ done, total }) {
  return (
    <div
      className="flex gap-2.5"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-label="Self-check progress"
    >
      {Array.from({ length: total }).map((_, i) => (
        <i
          key={i}
          className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
            i < done ? 'bg-rose-lite' : 'bg-line-ever'
          }`}
        />
      ))}
    </div>
  )
}

export default function Check() {
  const set = useContext(Ctx)
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState([])

  const choose = (i) => {
    const a = [...ans]
    a[step] = i
    setAns(a)
    setStep(step + 1)
  }

  const reset = () => {
    setStep(0)
    setAns([])
  }

  let body

  if (step < Q.length) {
    body = (
      <>
        <ProgressBar done={step} total={Q.length} />

        <div className="flex items-center justify-between text-[.9rem] font-medium text-onever-muted">
          <span>
            Question {step + 1} of {Q.length}
          </span>
          {step > 0 ? (
            <button className={linkCls} onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          ) : (
            <span />
          )}
        </div>

        <h3 className={headingCls}>{Q[step].q}</h3>

        <div className="grid gap-3">
          {Q[step].o.map(([t], i) => (
            <button
              key={t}
              onClick={() => choose(i)}
              className="group flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-4 rounded-[22px] border border-line-ever bg-white/[.04] px-7 py-5 text-left font-body text-[1.08rem] font-medium leading-[1.35] tracking-[-0.01em] text-onever transition duration-200 hover:translate-x-1 hover:border-rose-lite/70 hover:bg-white/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-lite active:scale-[.99]"
            >
              <span>{t}</span>
              <span
                aria-hidden="true"
                className="text-rose-lite opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                →
              </span>
            </button>
          ))}
        </div>
      </>
    )
  } else {
    const sc = { clarity: 1, growth: 0, relationship: 0, programmes: 0, journey: 0, community: 0 }
    ans.forEach((a, qi) => {
      const w = Q[qi].o[a][1]
      for (const k in w) sc[k] += w[k]
    })
    let best = 'clarity'
    for (const k in sc) if (sc[k] > sc[best]) best = k
    const [im, tag, t, d, int, cta] = R[best]

    body = (
      <>
        <ProgressBar done={Q.length} total={Q.length} />

        <div className="aspect-[16/8] overflow-hidden rounded-[22px]">
          <img src={img(im)} alt="" className="size-full object-cover" />
        </div>

        <div className="grid gap-3">
          <Kicker dark>{tag}</Kicker>
          <h3 className={headingCls}>{t}</h3>
          <Lede dark>{d}</Lede>
        </div>

        <div className="flex flex-wrap gap-3">
          <Btn dark interest={int}>{cta}</Btn>
          {best !== 'clarity' && (
            <Btn dark kind="line" interest="Clarity Connect (30 min)">
              Or start with Clarity Connect
            </Btn>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line-ever pt-5 text-[.88rem] text-onever-muted">
          <span>A reflection, not a diagnosis.</span>
          <button className={linkCls} onClick={reset}>
            Start again
          </button>
        </div>
      </>
    )
  }

  return (
    <Sec id="check" dark className="rounded-[28px]">
      <Wrap>
        <div className="grid grid-cols-[.85fr_1.15fr] items-start gap-[clamp(32px,5vw,80px)] max-[900px]:grid-cols-1">
          {/* Left column */}
          <div className="sticky top-[120px] grid gap-6 max-[900px]:static">
            <Kicker dark>60-second self-check</Kicker>
            <h2 className="m-0 text-[clamp(2.8rem,6vw,5.2rem)] font-bold leading-[.95] tracking-[-0.04em]">
              Where are you <It c="text-rose-lite">right now</It>?
            </h2>
            <Lede dark>
              Four quick questions. We'll suggest the support that fits you best, and you can
              decide what to do next.
            </Lede>
            <small className="max-w-[46ch] text-[.9rem] leading-relaxed text-onever-muted">
              This is a gentle reflection, not a diagnosis. Your answers stay on this page.
            </small>
          </div>

          {/* Right card */}
          <div
            aria-live="polite"
            className="grid min-h-[520px] content-start gap-7 rounded-[40px] border border-line-ever bg-gradient-to-b from-white/[.03] to-transparent bg-ever2 p-[clamp(24px,4vw,60px)] shadow-[0_30px_80px_-40px_rgba(0,0,0,.6)]"
          >
            {body}
          </div>
        </div>
      </Wrap>
    </Sec>
  )
}