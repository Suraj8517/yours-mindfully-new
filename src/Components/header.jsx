import { NAV } from "./utils/content/const"
import { Wrap } from "./utils/wrap"
import { img } from "./utils/img"
import Btn from "./utils/btn"

export default function Header({ progress }) {
  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-[14px] backdrop-saturate-150">
      <Wrap className="flex min-h-[74px] items-center justify-between gap-5">
        <a href="#top"><img src={img('logo')} alt="Mindfully You" width="380" height="353" className="block h-[50px] w-auto" /></a>
        <ul className="m-0 flex list-none gap-1.5 p-0 max-[900px]:hidden">
          {NAV.map(([l, h]) => <li key={h}><a href={h} className="rounded-full px-[.9em] py-[.55em] text-[.94rem] font-semibold no-underline hover:bg-paper2">{l}</a></li>)}
        </ul>
        <Btn className="!min-h-[44px] !px-[1.2em] !py-[.6em] !text-[.93rem] max-[900px]:hidden">Book a session</Btn>
      </Wrap>
      <div ref={progress} className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-rose to-leaf" />
    </header>
  )
}