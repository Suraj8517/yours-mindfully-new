import { CARDS, TILES } from "./utils/content/cards"
import {Wrap, It, Kicker, Lede,Sec} from './utils/heroUtils'
import Btn from './utils/btn'
import {img} from './utils/img'
import {TileLink} from './utils/tileLink'
export default function Services() {
  const fmt = 'rounded-full border border-current px-4 py-[.65em] text-[.72rem] font-bold uppercase leading-none tracking-[.14em] opacity-80'
  return (
    <Sec id="services" className="!pt-0">
      <Wrap>
        <div className="mb-[clamp(40px,5vw,64px)] grid grid-cols-[1fr_auto] items-end gap-6 max-[860px]:grid-cols-1">
          <div className="grid gap-[18px]"><Kicker>Our services</Kicker>
          <h2 className="text-[clamp(2rem,5vw,5.8rem)] leading-[1]">Support shaped around <It>you</It>.</h2></div>
          <div className="max-w-[44ch]"><Lede>Start with one conversation, go deeper in therapy, or learn and grow at your own pace. Every path is guided by qualified practitioners.</Lede></div>
        </div>
        <div className="grid gap-7">
          {CARDS.map((c, i) => (
            <article key={c.id} id={`svc-${c.id}`} style={{ '--i': i }}
              className={`sticky top-[calc(96px+var(--i)*22px)] grid min-h-[480px] grid-cols-[1.05fr_.95fr] overflow-hidden rounded-[28px] shadow-[0_-10px_40px_-20px_rgba(15,47,42,.35)] max-[860px]:top-[calc(84px+var(--i)*12px)] max-[860px]:min-h-0 max-[860px]:grid-cols-1 ${c.bg}`}>
              <div className="flex flex-col gap-[18px] p-[clamp(28px,4vw,56px)]">
                {c.ribbon && <span className="self-start rounded-full bg-rose-lite px-[1.1em] py-[.7em] text-[.74rem] font-bold uppercase leading-none tracking-[.14em] text-[#1B0F12]">{c.ribbon}</span>}
                <div className="flex flex-wrap gap-2">{c.fmt.map((f) => <span key={f} className={fmt}>{f}</span>)}</div>
                <h3 className="text-[clamp(2rem,4vw,3.4rem)] leading-[1]">{c.t}</h3>
                <p className="font-accent text-[clamp(1.3rem,2vw,1.6rem)] italic leading-[1]">{c.line}</p>
                <p className="max-w-[46ch] opacity-80">{c.d}</p>
                <div className="mt-auto flex flex-wrap gap-2.5 pt-3">
                  {c.acts.map(([l, int, line], j) => line
                    ? <Btn key={l} kind="line" interest={int} dark={i === 0}>{l}</Btn>
                    : <Btn key={l} interest={int} dark={i === 0} className={i === 0 ? '' : ''}>{l}</Btn>)}
                </div>
              </div>
              <div className="relative min-h-[260px] max-[860px]:-order-1 max-[860px]:min-h-[200px]">
                <img src={img(c.img)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 [background:linear-gradient(200deg,transparent_40%,rgba(15,47,42,.35))]" />
              </div>
            </article>
          ))}
        </div>
        <div id="belong" className="mt-[clamp(64px,8vw,110px)]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div className="grid gap-[18px]"><Kicker>Learn & belong</Kicker><h3 className="text-5xl">Grow at your own pace. <It>No therapy needed.</It></h3></div>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
            {TILES.map(([k, t, d, go, int, im]) => (
              <a key={t} href="#begin" onClick={() => {}} data-int={int} className="group relative isolate flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[22px] p-7 text-white no-underline max-[860px]:min-h-[320px]">
                <TileLink int={int} />
                <img src={img(im)} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 -z-10 [background:linear-gradient(180deg,rgba(15,47,42,.05)_0%,rgba(15,47,42,.55)_45%,rgba(15,47,42,.94)_100%)]" />
                <small className="text-[.72rem] font-bold uppercase leading-none tracking-[.16em] text-rose-lite">{k}</small>
                <h4 className="mb-2 mt-2.5 text-[1.9rem]">{t}</h4>
                <p className="text-[.97rem] text-white/85">{d}</p>
                <span className="mt-4 inline-flex gap-2 font-bold">{go} →</span>
              </a>
            ))}
          </div>
        </div>
      </Wrap>
    </Sec>
  )
}