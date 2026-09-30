import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {Wrap, It, Kicker, Lede,Sec} from './utils/heroUtils'
import Btn from './utils/btn'
import {img} from './utils/img'
import {TOPICS} from './utils/content/Topics'
gsap.registerPlugin(useGSAP)

export default function Hero() {
  const root = useRef(null)
  const orb = useRef(null)
  const label = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const track = useRef(null)
  const tickTween = useRef(null)

  const ring = 'absolute rounded-full border border-line-ever'
  const float = 'float-img absolute aspect-square w-[clamp(64px,8vw,92px)] overflow-hidden rounded-full border-[3px] border-ever shadow-[0_10px_30px_rgba(0,0,0,.35)]'

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* ---------- 1. Breathing: one 10s master timeline drives orb, rings and label ---------- */
      const el = label.current
      const swap = (text) => () => { el.firstElementChild.textContent = text }
      const textIn  = { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
      const textOut = { autoAlpha: 0, y: -8, filter: 'blur(4px)', duration: 1, ease: 'power2.in' }
      const textFrom = { autoAlpha: 0, y: 8, filter: 'blur(4px)' }

      gsap.set(orb.current, { scale: 0.88, opacity: 0.75 })
      gsap.set(ringA.current, { scale: 1.06 })
      gsap.set(ringB.current, { scale: 0.92 })

      const breath = gsap.timeline({ repeat: -1 })

      // inhale (0 → 5s)
      breath
        .call(swap('Breathe in'), null, 0)
        .fromTo(el, textFrom, textIn, 0)
        .to(orb.current,   { scale: 1.08, opacity: 1, duration: 5, ease: 'sine.inOut' }, 0)
        .to(ringA.current, { scale: 0.96, duration: 5, ease: 'sine.inOut' }, 0)
        .to(ringB.current, { scale: 1.06, duration: 5, ease: 'sine.inOut' }, 0)
        .to(el, textOut, 4)

      // exhale (5 → 10s)
      breath
        .call(swap('Breathe out'), null, 5)
        .fromTo(el, textFrom, textIn, 5)
        .to(orb.current,   { scale: 0.88, opacity: 0.75, duration: 5, ease: 'sine.inOut' }, 5)
        .to(ringA.current, { scale: 1.06, duration: 5, ease: 'sine.inOut' }, 5)
        .to(ringB.current, { scale: 0.92, duration: 5, ease: 'sine.inOut' }, 5)
        .to(el, textOut, 9)

      /* ---------- 2. Floating images ---------- */
      const floats = gsap.utils.toArray('.float-img')

      gsap.from(floats, {
        scale: 0, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.18, delay: 0.3,
      })

      floats.forEach((f, i) => {
        gsap.to(f, {
          x: 'random(-14, 14)',
          y: 'random(-22, -8)',
          rotation: 'random(-6, 6)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          repeatRefresh: true, // new random target every cycle, so it never looks looped
          delay: i * 0.4,
        })
      })

      /* ---------- 3. Marquee ---------- */
      tickTween.current = gsap.to(track.current, {
        xPercent: -50, duration: 40, ease: 'none', repeat: -1,
      })
    })

    return () => mm.revert()
  }, { scope: root })

  // smooth slow-down / speed-up on hover instead of a hard pause
  const slow = (to) => tickTween.current && gsap.to(tickTween.current, { timeScale: to, duration: 0.6, overwrite: true })

  return (
    <section ref={root} id="top" className="relative overflow-hidden rounded-b-[28px] bg-ever pt-[clamp(56px,8vw,110px)] text-onever">
      <Wrap>
        <div className="grid grid-cols-[1.2fr_.8fr] items-center gap-[clamp(24px,4vw,56px)] max-[900px]:grid-cols-1">
          <div className="relative z-[2] grid gap-7">
            <Kicker dark>Mindfully You · Online emotional wellness</Kicker>
            <h1 className="text-[clamp(3rem,8vw,110px)] font-normal leading-none text-white">
              Feel more like<br /> <It c="text-rose-lite">yourself</It> again.
            </h1>
            <Lede dark>Therapy, relationship support and guided programmes for people who are ready to understand themselves, heal old patterns and live with more clarity. Wherever you are in the world.</Lede>
            <div className="flex flex-wrap gap-3">
              <Btn dark interest="Clarity Connect (30 min)">Book a 30-min Clarity Connect</Btn>
              <Btn dark kind="line" href="#check">Take the 60-second self-check</Btn>
            </div>
            <div className="flex flex-wrap gap-x-[26px] gap-y-2.5 text-[.92rem] text-onever-muted">
              {['100% online', 'Confidential', 'Evidence-based therapy'].map((t) => (
                <span key={t} className="inline-flex items-center gap-[9px] before:size-1.5 before:rounded-full before:bg-leaf before:content-['']">{t}</span>
              ))}
            </div>
          </div>

          <div className="relative grid aspect-square w-full max-w-[460px] place-items-center justify-self-center max-[900px]:max-w-[320px]" aria-hidden="true">
            <div ref={ringA} className={`${ring} inset-[-4%] opacity-50`} />
            <div ref={ringB} className={`${ring} inset-[4%]`} />
            <div ref={orb} className="absolute inset-[14%] rounded-full shadow-[0_0_120px_20px_rgba(224,105,127,.25)] blur-[2px] [background:radial-gradient(circle_at_35%_30%,#F7B6C3_0%,#E0697F_34%,#5E8F6E_72%,#1D4A42_100%)]" />

            <div ref={label} className="relative z-[2] grid gap-1 text-center">
              <b className="font-accent text-[clamp(1.7rem,3vw,2.3rem)] font-normal italic leading-none text-white">Breathe in</b>
              <small className="text-[.74rem] font-bold uppercase tracking-[.18em] text-white/80">Pause for a moment</small>
            </div>

            <div className={`${float} left-[8%] top-[2%]`}><img src={img('g4')} alt="" className="size-full object-cover" /></div>
            <div className={`${float} bottom-[10%] left-[-2%]`}><img src={img('g8')} alt="" className="size-full object-cover" /></div>
            <div className={`${float} right-[-2%] top-[18%]`}><img src={img('g2')} alt="" className="size-full object-cover" /></div>
          </div>
        </div>
      </Wrap>

      <div
        className="mt-[clamp(56px,8vw,96px)] overflow-hidden border-t border-line-ever py-[22px]"
        onMouseEnter={() => slow(0)}
        onMouseLeave={() => slow(1)}
      >
        <div ref={track} className="flex w-max">
          {[0, 1].map((g) => (
            <div key={g} className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={g === 1}>
              {TOPICS.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-12 whitespace-nowrap font-accent text-[clamp(1.3rem,2.2vw,1.8rem)] italic leading-none text-onever-muted after:text-[.8em] after:not-italic after:text-rose-lite after:content-['✳']">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}