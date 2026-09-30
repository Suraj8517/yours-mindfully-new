import { Wrap, It, Kicker, Sec } from "./utils/heroUtils"
import { img } from "./utils/img"
import { CREDS, FOCUS } from "./utils/content/team"

export default function Team() {
  return (
    <Sec id="team">
      <Wrap>
        <div className="grid grid-cols-[.9fr_1.1fr] items-center gap-[clamp(32px,5vw,80px)] max-[900px]:grid-cols-1">
          <figure className="relative m-0 aspect-[4/5] max-w-full overflow-hidden rounded-[28px] max-[900px]:max-w-[440px]">
            <img src={img('arthi')} alt="Portrait of Arthi Sujai" width="720" height="720" loading="lazy" className="size-full object-cover [object-position:50%_25%]" />
            <figcaption className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-ever/80 px-5 py-[18px] text-onever backdrop-blur-[10px]">
              <div className="grid"><b className="font-display text-[1.35rem] font-medium leading-[1.1]">Arthi Sujai</b><span className="text-[.85rem] text-onever-muted">Psychotherapist · Counselling psychologist</span></div>
              <div className="text-right font-display text-[2.2rem] font-medium leading-none text-rose-lite">13+<small className="block text-[.7rem] font-bold uppercase tracking-[.14em] text-onever-muted">yrs</small></div>
            </figcaption>
          </figure>
          <div className="grid gap-6">
            <Kicker>Our team</Kicker>
            <h2 className="text-[60px] leading-[1]">The people who'll <br/>walk <It>with you</It>.</h2>
            <p className="font-accent text-[1.35rem] italic leading-[1.3] text-rose">Arthi Sujai, psychotherapist, counselling psychologist and emotional well-being coach</p>
            <p className="max-w-[56ch] text-muted">With over 13 years of experience, Arthi has helped individuals, couples and families understand emotional patterns, strengthen relationships and build healthier lives. Her approach combines evidence-based practice with compassionate guidance, aimed at change that holds.</p>
            <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 max-[560px]:grid-cols-1">
              {CREDS.map(([k, v]) => <li key={k} className="grid gap-1 rounded-[14px] bg-paper2 px-4 py-3.5 text-[.95rem] font-semibold leading-[1.35]"><small className="text-[.68rem] font-bold uppercase leading-none tracking-[.14em] text-muted">{k}</small>{v}</li>)}
            </ul>
            <p className="text-[.74rem] font-bold uppercase leading-none tracking-[.16em] text-muted">Areas of focus</p>
            <div className="flex flex-wrap gap-2">{FOCUS.map((f) => <span key={f} className="rounded-full border border-gray-300 px-4 py-[.45em] text-[.9rem] font-medium">{f}</span>)}</div>
          </div>
        </div>
      </Wrap>
    </Sec>
  )
}