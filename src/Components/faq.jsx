import { useState } from "react"
import { FAQS } from "./utils/content/faq"
import { Wrap, It, Kicker, Lede, Sec } from "./utils/heroUtils"

function Item({ q, a, id, open, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        open ? "border-rose/40 bg-card shadow-[0_18px_40px_-28px_rgba(0,0,0,.35)]" : "border-line bg-transparent hover:border-ink/25"
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-2xl bg-transparent px-6 py-5 text-left font-display text-[clamp(1.1rem,1.7vw,1.35rem)] font-medium leading-[1.3] tracking-[-.015em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose max-[480px]:px-5"
        >
          <span className={`transition-colors duration-300 ${open ? "text-rose" : ""}`}>{q}</span>
          <span
            aria-hidden="true"
            className={`relative grid size-9 flex-none place-items-center rounded-full border-[1.5px] transition-colors duration-300 ${
              open ? "border-rose bg-rose text-white" : "border-line text-ink"
            }`}
          >
            <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
            <span className={`absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-90" : ""}`} />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="m-0 max-w-[62ch] px-6 pb-6 text-muted max-[480px]:px-5">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <Sec id="faq">
      <Wrap>
        <div className="grid grid-cols-[.8fr_1.2fr] items-start gap-[clamp(32px,5vw,80px)] max-[900px]:grid-cols-1">
          <div className="grid content-start gap-8 min-[901px]:sticky min-[901px]:top-[120px]">
            <div className="grid gap-5">
              <Kicker>Questions</Kicker>
              <h2>Before you <It>begin</It>.</h2>
              <Lede>Anything else on your mind? Ask us directly in the form below.</Lede>
            </div>

            <div className="grid gap-3 rounded-2xl border border-line bg-card p-6">
              <p className="m-0 font-display text-[1.2rem] font-medium leading-[1.3] text-ink">Can't find your question?</p>
              <p className="m-0 text-[.95rem] text-muted">Send us a message and we'll reply on WhatsApp.</p>
              <a
                href="#begin"
                className="mt-1 inline-flex w-fit items-center rounded-full border-[1.5px] border-rose px-5 py-2.5 text-[.95rem] font-bold text-rose no-underline transition hover:bg-rose hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
              >
                Ask us directly
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            {FAQS.map(([q, a], i) => (
              <Item
                key={q}
                id={`faq-${i}`}
                q={q}
                a={a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </Wrap>
    </Sec>
  )
}