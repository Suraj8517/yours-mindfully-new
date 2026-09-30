import {Wrap, It, Kicker, Lede,Sec} from './utils/heroUtils'
import {THOUGHTS} from './utils/content/thoughts'
import Btn from './utils/btn'
import {NUMS} from './utils/content/nums'
export default function Familiar({ on }) {
  return (
    <>
      <Sec id="familiar">
        <Wrap>
          <div className="mb-[clamp(40px,6vw,72px)] grid max-w-[760px] gap-[18px]">
            <Kicker>Sound familiar?</Kicker>
            <h2 className="font-display text-[clamp(2rem,4vw,4.2rem)] font-normal leading-[1] tracking-[-.03em]">Life doesn't come with a <It>manual</It> for this.</h2>
            <Lede>Most people who reach out to us don't have the perfect words. They have a feeling that something needs to change.</Lede>
          </div>
          <ul className="m-0 grid list-none p-0">
            {THOUGHTS.map(([q, to, h], i) => (
              <li key={q} data-th className={`border-t border-line last:border-b`}>
                <a href={h} className={`group grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2.5 py-[clamp(22px,3vw,36px)] no-underline transition-colors duration-500 hover:text-ink max-[700px]:grid-cols-1 ${on === i ? 'text-ink' : 'text-faint'}`}>
                  <q className="font-display text-[clamp(1.6rem,3.8vw,3.2rem)] font-normal leading-[1.1] tracking-[-.03em] [quotes:'\201C'_'\201D']">{q}</q>
                  <span className={`whitespace-nowrap text-[.9rem] font-bold text-rose transition-opacity duration-500 group-hover:opacity-100 ${on === i ? 'opacity-100' : 'opacity-35'}`}>{to} →</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-7 gap-y-4">
            <p className="max-w-[30ch] font-accent text-[clamp(1.4rem,2.4vw,1.9rem)] italic leading-[1.2]">Whatever you're carrying, there's a place to begin.</p>
            <Btn href="#check">Find your starting point</Btn>
          </div>
        </Wrap>
      </Sec>
      <section className="pb-[clamp(80px,11vw,150px)]">
        <Wrap>
          <div className="grid grid-cols-4 overflow-hidden rounded-[28px] bg-paper2 max-[860px]:grid-cols-2">
            {NUMS.map(([n, u, l], i) => (
              <div key={l} className={`grid content-start gap-2.5 border-line p-[clamp(24px,3vw,40px)] ${i ? 'border-l' : ''} ${i === 2 ? 'max-[860px]:border-l-0' : ''} ${i > 1 ? 'max-[860px]:border-t' : ''}`}>
                <b className="font-display text-[clamp(2.6rem,5vw,4.2rem)] font-medium leading-[.9] tracking-[-.04em] tabular-nums">{n}{u && <sup className="align-super text-[.45em] text-rose">{u}</sup>}</b>
                <span className="max-w-[22ch] text-[.95rem] text-muted">{l}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  )
}
