import { useEffect, useRef } from "react"
import { STORIES } from "./utils/content/stories"
import { Wrap, It, Kicker, Lede, Sec } from "./utils/heroUtils"

const FADE = "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"

function Marquee({ items, speed = 40, reverse = false }) {
  const trackRef = useRef(null)
  const s = useRef({ x: 0, half: 0, hover: false, drag: false, startX: 0, startPos: 0 })

  useEffect(() => {
    const el = trackRef.current
    const st = s.current
    const measure = () => { st.half = el.scrollWidth / 2 }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reduce && !st.hover && !st.drag) st.x += (reverse ? 1 : -1) * speed * dt
      if (st.half) {
        if (st.x <= -st.half) st.x += st.half // seamless loop
        if (st.x > 0) st.x -= st.half
      }
      el.style.transform = `translate3d(${st.x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [speed, reverse])

  const st = s.current
  const onDown = (e) => {
    st.drag = true
    st.startX = e.clientX
    st.startPos = st.x
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => { if (st.drag) st.x = st.startPos + (e.clientX - st.startX) }
  const onUp = () => { st.drag = false }

  // one "set" is repeated twice so the loop always covers wide screens
  const set = [...items, ...items]
  const loop = [...set, ...set]

  return (
    <div
      className={`cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing ${FADE}`}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") st.hover = true }}
      onPointerLeave={() => { st.hover = false }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div ref={trackRef} className="flex w-max gap-5 pr-5 will-change-transform">
        {loop.map(([q, n], i) => (
          <figure
            key={i}
            aria-hidden={i >= items.length ? "true" : undefined}
            className="group m-0 flex w-[min(420px,82vw)] flex-none flex-col gap-6 rounded-[22px] border border-line-ever bg-ever2 p-[30px] mb-10 transition-colors duration-300 hover:border-rose-lite/50"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-rose-lite opacity-80 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="currentColor"
            >
              <path d="M9.6 5C6.5 6.3 4 9.4 4 13.3V19h6.4v-6.2H7.2c.1-2.2 1.2-3.9 3.1-4.9L9.6 5zm9.6 0c-3.1 1.3-5.6 4.4-5.6 8.3V19H20v-6.2h-3.2c.1-2.2 1.2-3.9 3.1-4.9L19.200 5z" />
            </svg>

            <blockquote className="m-0 font-accent text-[1.35rem] leading-[1.4] text-onever">{q}</blockquote>

            <figcaption className="mt-auto flex items-center gap-3 border-t border-line-ever pt-5">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 flex-none place-items-center rounded-full bg-rose-lite/15 text-[.85rem] font-bold uppercase text-rose-lite"
              >
                {String(n).trim().charAt(0)}
              </span>
              <span className="text-[.9rem] font-semibold text-onever-muted">{n}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function Stories() {
  const many = STORIES.length >= 6
  const mid = Math.ceil(STORIES.length / 2)
  const rowA = many ? STORIES.slice(0, mid) : STORIES
  const rowB = many ? STORIES.slice(mid) : [...STORIES].reverse()

  return (
    <Sec dark className="overflow-hidden rounded-[28px]">
      <Wrap>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="grid gap-[18px]">
            <Kicker dark>In their words</Kicker>
            <h2 className="text-6xl">Messages we <It c="text-rose-lite">hold onto</It>.</h2>
          </div>
          <div className="grid max-w-[46ch] gap-3">
            <Lede dark>Shared with us by people who took the first step. Unedited, exactly as they reached us.</Lede>
           
          </div>
        </div>
      </Wrap>

      <div className="grid gap-5">
        <Marquee items={rowA} speed={38} />
      </div>
    </Sec>
  )
}