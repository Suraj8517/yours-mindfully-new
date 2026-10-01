import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Hero from './Components/Hero'
import {Wrap, It, Kicker, Lede,Sec} from './Components/utils/heroUtils'
import Services from './Components/services'
import Btn from './Components/utils/btn'
import Familiar from './Components/familiar'
import Check from './Components/check'
import Process from './Components/process'
import Beliefs from './Components/beliefs'
import Team from './Components/team'
import Stories from './Components/stories'
import FAQ from './Components/faq'
import Final from './Components/final'
import Footer from './Components/footer'
import Header from './Components/header'
import { Ctx } from './Components/utils/ctx'
import MindfullyLoader from './Components/utils/loader'   

export default function App() {
  const [interest, setInterest] = useState('Clarity Connect (30 min)')
  const progress = useRef(null), pathRef = useRef(null)
  const [on, setOn] = useState(-1)
  const [steps, setSteps] = useState([false, false, false, false])
  useEffect(() => {
    let tick = false
    const run = () => {
      tick = false
      const h = document.documentElement, max = h.scrollHeight - h.clientHeight, vh = window.innerHeight, mid = vh * 0.55
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`
      const p = pathRef.current
      if (p) {
        const r = p.getBoundingClientRect()
        p.style.setProperty('--p', Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3))
        setSteps([...p.children].map((li) => li.getBoundingClientRect().top < mid))
      }
      let best = -1, bd = 1e9
      document.querySelectorAll('[data-th]').forEach((li, i) => { const b = li.getBoundingClientRect(), d = Math.abs(b.top + b.height / 2 - vh * 0.5); if (d < bd) { bd = d; best = i } })
      setOn(bd < vh * 0.35 ? best : -1)
    }
    const h = () => { if (!tick) { tick = true; requestAnimationFrame(run) } }
    window.addEventListener('scroll', h, { passive: true }); window.addEventListener('resize', h); run()
    return () => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h) }
  }, [])
  return (
    <Ctx.Provider value={setInterest}>
      <MindfullyLoader />                                      
      <Header progress={progress} />
      <main>
        <Hero /><Familiar on={on} /><Services /><Check /><Process pathRef={pathRef} onSteps={steps} /><Beliefs /><Team /><Stories /><FAQ />
        <Final interest={interest} setInterest={setInterest} />
      </main>
      <Footer />
      <div className="fixed inset-x-0 bottom-0 z-50 hidden gap-2.5 border-t border-line bg-paper/90 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] backdrop-blur-[12px] max-[900px]:flex">
        <Btn kind="line" href="#check" className="flex-1 !min-h-12 !text-[.93rem]">Self-check</Btn>
        <Btn className="flex-1 !min-h-12 !text-[.93rem]">Book a session</Btn>
      </div>
    </Ctx.Provider>
  )
}