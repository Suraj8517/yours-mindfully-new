import { Wrap } from './utils/wrap'
import { img } from './utils/img'
import { NAV } from './utils/content/const'

export default function Footer() {
  return (
    <footer className="bg-ever pb-[110px] text-onever-muted min-[901px]:pb-12">
      <Wrap>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-ever pt-9">
          <a href="#top" className="inline-flex rounded-2xl bg-paper px-3.5 py-2"><img src={img('logo')} alt="Mindfully You" loading="lazy" className="block h-[52px] w-auto" /></a>
          <nav className="flex flex-wrap gap-[22px]">{[...NAV, ['Contact', '#begin']].map(([l, h]) => <a key={h} href={h} className="text-[.93rem] font-semibold text-onever no-underline hover:text-rose-lite">{l}</a>)}</nav>
          <small className="basis-full text-[.84rem]">© 2026 Mindfully You. Where your mind & heart feel at home. Mindfully You offers counselling and emotional wellness support and is not an emergency service. If you are in crisis, please contact your local emergency services.</small>
        </div>
      </Wrap>
    </footer>
  )
}