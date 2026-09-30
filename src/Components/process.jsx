import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { Wrap, It, Kicker, Lede, Sec } from './utils/heroUtils'
import Btn from './utils/btn'
import { STEPS } from './utils/content/steps'

const DOT = 40 // dot size in px (h-10 w-10)

export default function Process({ pathRef, onSteps }) {
  const listRef = useRef(null)
  const [track, setTrack] = useState({ top: DOT / 2, height: 0 }) // first dot center -> last dot center
  const [fill, setFill] = useState(0)                              // px of the line that is "drawn"
  const [active, setActive] = useState(() => STEPS.map(() => false))

  // merge internal ref with the optional pathRef prop
  const setRefs = useCallback(
    (node) => {
      listRef.current = node
      if (typeof pathRef === 'function') pathRef(node)
      else if (pathRef) pathRef.current = node
    },
    [pathRef]
  )

  // measure where the first and last dot centers sit
  const measure = useCallback(() => {
    const ol = listRef.current
    if (!ol) return
    const items = ol.querySelectorAll(':scope > li')
    if (!items.length) return
    const top = items[0].offsetTop + DOT / 2
    const bottom = items[items.length - 1].offsetTop + DOT / 2
    setTrack({ top, height: Math.max(bottom - top, 0) })
  }, [])

  // one scroll value drives BOTH the line fill and the dot colors
  const update = useCallback(() => {
    const ol = listRef.current
    if (!ol) return
    const items = ol.querySelectorAll(':scope > li')
    if (!items.length) return

    const trigger = window.innerHeight * 0.6 // the "reading line" in the viewport
    const olTop = ol.getBoundingClientRect().top
    const first = items[0].offsetTop + DOT / 2
    const last = items[items.length - 1].offsetTop + DOT / 2

    const y = trigger - olTop // trigger position relative to the <ol>

    setFill(Math.min(Math.max(y - first, 0), last - first))

    const next = Array.from(items, (li) => li.offsetTop + DOT / 2 <= y)
    setActive((prev) =>
      prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next
    )
  }, [])

  useLayoutEffect(() => {
    measure()
    update()
  }, [measure, update])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize) // re-measure if content/fonts change layout
    if (listRef.current) ro.observe(listRef.current)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [measure, update])

  return (
    <Sec id="process">
      <Wrap>
        <div className="grid grid-cols-[.8fr_1.2fr] items-start gap-[clamp(32px,5vw,80px)] max-[900px]:grid-cols-1">
          <div className="sticky top-[120px] grid gap-5 max-[900px]:static">
            <Kicker>How it works</Kicker>
            <h2 className="text-[60px] leading-[1]">What happens after you <It>reach out</It>.</h2>
            <Lede>No forms to fill for weeks, no waiting in the dark. Here's the path from first message to lasting change.</Lede>
            <div><Btn>Take the first step</Btn></div>
          </div>

          <ol
            ref={setRefs}
            className="path relative m-0 grid list-none gap-[clamp(48px,7vw,88px)] p-0 pl-16"
          >
            {/* background track (full line) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[19px] w-[2px] rounded-full bg-black/10"
              style={{ top: track.top, height: track.height }}
            />
            {/* growing fill line */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[19px] w-[2px] rounded-full bg-rose will-change-[height]"
              style={{ top: track.top, height: fill }}
            />

            {STEPS.map(([k, t, d], i) => (
              <li
                key={k}
                data-n={i + 1}
                // keeps using onSteps for text animations if you pass it, otherwise falls back to the line-synced state
                className={`relative grid gap-2.5 ${(onSteps ? onSteps[i] : active[i]) ? 'on' : ''}`}
              >
                {/* numbered dot: changes color exactly when the line reaches it */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-16 top-0 z-10 grid h-10 w-10 place-items-center rounded-full border-2 text-[.95rem] font-bold leading-none transition-[background-color,border-color,color,transform] duration-150
                    ${active[i]
                      ? 'scale-105 border-rose bg-rose text-white'
                      : 'border-black/15 bg-white text-muted'}`}
                >
                  {i + 1}
                </span>

                <small className="text-[.74rem] font-bold uppercase leading-none tracking-[.16em] text-rose">{k}</small>
                <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)]">{t}</h3>
                <p className="max-w-[52ch] text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </Sec>
  )
}