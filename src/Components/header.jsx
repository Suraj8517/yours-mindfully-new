import { useEffect, useState } from "react"
import { NAV } from "./utils/content/const"
import { Wrap } from "./utils/wrap"
import { img } from "./utils/img"
import Btn from "./utils/btn"

export default function Header({ progress }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Close on Escape, and when the screen grows past the mobile breakpoint
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    const mq = window.matchMedia("(min-width: 901px)")
    const onMq = (e) => e.matches && setOpen(false)
    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onMq)
    return () => {
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onMq)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-[14px] backdrop-saturate-150">
      <Wrap className="flex min-h-[74px] items-center justify-between gap-5">
        <a href="#top" onClick={close}>
          <img src={img('logo')} alt="Mindfully You" width="380" height="353" className="block h-[50px] w-auto" />
        </a>

        {/* Desktop nav */}
        <ul className="m-0 flex list-none gap-1.5 p-0 max-[900px]:hidden">
          {NAV.map(([l, h]) => <li key={h}><a href={h} className="rounded-full px-[.9em] py-[.55em] text-[.94rem] font-semibold no-underline hover:bg-paper2">{l}</a></li>)}
        </ul>

        {/* Desktop buttons */}
        <div className="flex items-center gap-2.5 max-[900px]:hidden">
          <Btn kind="line" href="#check" className="!min-h-[44px] !px-[1.2em] !py-[.6em] !text-[.93rem]">Self-check</Btn>
          <Btn className="!min-h-[44px] !px-[1.2em] !py-[.6em] !text-[.93rem]">Book a session</Btn>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative hidden h-11 w-11 items-center justify-center rounded-full hover:bg-paper2 max-[900px]:flex"
        >
          <span className={`absolute h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </Wrap>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full hidden border-line bg-paper shadow-[0_18px_30px_-18px_rgba(0,0,0,.25)] transition-[grid-template-rows] duration-300 ease-out max-[900px]:grid ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className={`min-h-0 overflow-hidden transition-[visibility] ${open ? "visible" : "invisible delay-300"}`}>
          <Wrap className="pt-2 pb-5">
            <ul className="m-0 list-none p-0">
              {NAV.map(([l, h]) => (
                <li key={h} className="border-b border-line">
                  <a href={h} onClick={close} className="block py-3.5 text-[1.05rem] font-semibold no-underline">{l}</a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2.5" onClick={close}>
              <Btn kind="line" href="#check" className="flex-1 !min-h-12 !text-[.93rem]">Self-check</Btn>
              <Btn className="flex-1 !min-h-12 !text-[.93rem]">Book a session</Btn>
            </div>
          </Wrap>
        </div>
      </div>

      <div ref={progress} className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-rose to-leaf" />
    </header>
  )
}