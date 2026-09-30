import { BELIEFS } from "./utils/content/beliefs"
import { Wrap, It, Kicker, Lede, Sec } from "./utils/heroUtils"
import { img } from "./utils/img"

export default function Beliefs() {
  return (
    <Sec id="approach" className="rounded-[28px] bg-paper2 px-[clamp(20px,4vw,64px)] max-w-7xl mx-auto">
      <Wrap className="!px-0">
        <div className="grid gap-[18px] "><Kicker>What we believe</Kicker><h2 className="text-[clamp(1.8rem,3.2vw,5.8rem)] leading-[1]">Evidence-based<br/> Deeply <It>human</It>.</h2></div>
        <ul className="m-0 mt-[clamp(40px,5vw,64px)] list-none p-0">
          {BELIEFS.map(([n, a, em, z, p, im]) => (
            <li key={n} className="group grid grid-cols-[auto_1fr_200px] items-center gap-[clamp(20px,3vw,48px)] border-t border-gray-300 border-line py-[clamp(24px,3vw,36px)] last:border-b max-[860px]:grid-cols-1">
              <span className="min-w-[160px] text-[.74rem] font-bold uppercase leading-none tracking-[.16em] text-rose">{n}</span>
              <div><h3 className="text-[clamp(1.4rem,2.8vw,2.3rem)]">{a} <It>{em}</It>{z}</h3><p className="mt-2.5 max-w-[60ch] text-[.98rem] text-muted">{p}</p></div>
              <div className="aspect-[4/3] max-w-full overflow-hidden rounded-2xl max-[860px]:max-w-[320px]"><img src={img(im)} alt="" loading="lazy" className="size-full object-cover saturate-90 transition-transform duration-[600ms] group-hover:scale-[1.06]" /></div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          {['Confidential, always', 'Online, from anywhere', 'Guided to the right fit'].map((t) => <span key={t} className="inline-flex items-center gap-2.5 rounded-full bg-white px-[1.3em] py-[.8em] text-[.95rem] font-semibold before:size-2 before:rounded-full before:bg-leaf before:content-['']">{t}</span>)}
        </div>
      </Wrap>
    </Sec>
  )
}