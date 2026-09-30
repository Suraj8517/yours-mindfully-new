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
const WA = '918825611379'
const Ctx = createContext(() => {})
const img = (n) => `/img/${n}.webp`
const NAV = [['Services', '#services'], ['Self-check', '#check'], ['How it works', '#process'], ['Our team', '#team'], ['FAQ', '#faq']]
const TOPICS = ['Stress', 'Overwhelming emotions', 'Relationships', 'Life transitions', 'Self-understanding', 'Emotional patterns', 'Inner child healing', 'Personal growth']
const THOUGHTS = [
  ['I keep ending up in the same place, and I don\'t know why.', 'Personal Growth & Healing', '#svc-growth'],
  ['We love each other, but we keep having the same fight.', 'Relationship Wellness', '#svc-relationship'],
  ['Everything changed so fast. I haven\'t caught up yet.', 'Emotional Wellness Programs', '#svc-programmes'],
  ['I want to understand myself better, at my own pace.', 'Journey to Yourself', '#belong'],
  ['I\'m not even sure what I need.', 'Clarity Connect', '#svc-clarity'],
]
const NUMS = [['13', '+', 'years of therapeutic practice'], ['100', '%', 'online, so you can join from anywhere'], ['30', 'min', 'first conversation to find your way forward'], ['7', '', 'ways to begin, from therapy to community']]
const CARDS = [
  { id: 'clarity', bg: 'bg-ever text-onever', ribbon: 'Start here', fmt: ['1:1 session', '30 minutes', 'Online'], t: 'Clarity Connect', line: 'Not sure what you need? Start with a conversation.', d: 'A 30-minute one-on-one session to understand where you are, what you may need, and the best way forward. It\'s the easiest first step into any of our services.', acts: [['Book Clarity Connect', 'Clarity Connect (30 min)']], img: 'clarity' },
  { id: 'growth', bg: 'bg-rose-soft text-ink', fmt: ['Therapy programme', 'Individuals'], t: 'Personal Growth & Healing', line: 'Understand your patterns. Heal. Grow differently.', d: 'Structured emotional support to help you understand yourself, work through emotional patterns, and create meaningful change that lasts.', acts: [['Request a callback', 'Personal Growth & Healing'], ['Brochure', 'Personal Growth & Healing', 1]], img: 'growth' },
  { id: 'relationship', bg: 'bg-leaf-soft text-ink', fmt: ['Couples programme', 'Married & unmarried'], t: 'Relationship Wellness', line: 'Better relationships begin with better understanding.', d: 'For individuals and couples who want to prepare for, strengthen, heal, or better understand their relationships.', acts: [['Request a callback', 'Relationship Wellness'], ['Before marriage', 'Relationship Wellness', 1], ['For married couples', 'Relationship Wellness', 1]], img: 'relationship' },
  { id: 'programmes', bg: 'bg-mist text-ink', fmt: ['Guided programme', 'Life stages'], t: 'Emotional Wellness Programs', line: 'Support for the journeys that matter to you.', d: 'Structured programmes designed to support you through different stages and experiences of life, step by step.', acts: [['Request a callback', 'Emotional Wellness Programs']], img: 'emotional' },
]
const TILES = [
  ['Self-paced course', 'Journey to Yourself', 'Small lessons, meaningful change. Learn, reflect and grow in your own time.', 'Ask about the course', 'Journey to Yourself course', 'journey'],
  ['Live events', 'Webinars & Masterclasses', 'Live learning with space to reflect and ask questions. New dates announced on Instagram.', 'Follow for dates', 'Something else', 'webinars'],
  ['Community', 'You don\'t have to grow alone', 'A supportive space for reflection, connection and shared learning.', 'Ask to join', 'Joining the WhatsApp community', 'community'],
]
const Q = [
  { q: 'What\'s taking up most of your headspace lately?', o: [['My own feelings or patterns', { growth: 2 }], ['My relationship', { relationship: 3 }], ['A big change in my life', { programmes: 3 }], ['I\'m curious to understand myself better', { journey: 2, community: 1 }]] },
  { q: 'How long has it felt this way?', o: [['A few weeks', { programmes: 1, clarity: 1 }], ['Several months', { growth: 1 }], ['As long as I can remember', { growth: 2 }], ['It\'s not a problem, just curiosity', { journey: 1 }]] },
  { q: 'What kind of support sounds right?', o: [['One-on-one and personal', { growth: 2 }], ['Together with my partner', { relationship: 3 }], ['Structured, step by step', { programmes: 2 }], ['At my own pace, on my own time', { journey: 3 }], ['Alongside others', { community: 3 }]] },
  { q: 'How ready do you feel to talk to someone?', o: [['Ready now', { growth: 1, relationship: 1 }], ['I\'d like to talk first and see', { clarity: 3 }], ['Not yet, I\'d rather learn first', { journey: 2, community: 1 }]] },
]
const R = {
  clarity: ['clarity', 'Your starting point', 'Clarity Connect', 'A 30-minute one-on-one conversation to understand where you are and what would help most. No pressure, no long commitment.', 'Clarity Connect (30 min)', 'Book Clarity Connect'],
  growth: ['growth', 'Suggested for you', 'Personal Growth & Healing', 'Structured one-on-one support to understand your patterns, heal what keeps repeating and create change that holds.', 'Personal Growth & Healing', 'Request a callback'],
  relationship: ['relationship', 'Suggested for you', 'Relationship Wellness', 'Support for individuals and couples who want to prepare for, strengthen, heal or better understand their relationship.', 'Relationship Wellness', 'Request a callback'],
  programmes: ['emotional', 'Suggested for you', 'Emotional Wellness Programs', 'Structured, step-by-step programmes that support you through life\'s stages and changes.', 'Emotional Wellness Programs', 'Request a callback'],
  journey: ['journey', 'Suggested for you', 'Journey to Yourself', 'Self-paced lessons to help you learn, reflect and grow in your own time. No therapy needed.', 'Journey to Yourself course', 'Ask about the course'],
  community: ['community', 'Suggested for you', 'Community & live events', 'Grow alongside others through our supportive community, webinars and masterclasses.', 'Joining the WhatsApp community', 'Ask to join'],
}
const STEPS = [
  ['You reach out', 'Send a message, your way', 'WhatsApp, email or the callback form. We\'ll reply to find a time that suits you, wherever you are.'],
  ['Clarity Connect', 'A 30-minute conversation', 'Talk about what\'s going on. Through professional guidance and assessments, we understand your emotional patterns and what you need.'],
  ['Your path', 'A plan that\'s truly yours', 'Begin a personalised emotional wellness journey with practical tools and structured support, in therapy, a programme or a course.'],
  ['Lasting change', 'Grow with confidence', 'Keep growing through continued learning, community and long-term emotional well-being.'],
]
const BELIEFS = [
  ['Educate & inspire', 'Learning should change how a day', 'feels', ', not just what you know.', 'We reconnect people with themselves through mindful, evidence-based psychological practice.', 'educate'],
  ['Empower practice', 'Insight only matters once it\'s', 'usable', '.', 'Guided tools and structured exercises you can reach for in the moment you need them.', 'empower'],
  ['Foster community', 'Healing rarely happens', 'alone', '.', 'Spaces, in person and online, where you can be honest about where you are and still feel held.', 'foster'],
  ['Advance well-being', 'Wellness shifts with every', 'season', ' of life.', 'Our work meets you where you are now, and again where you\'ll be next.', 'g5'],
]
const CREDS = [['Member', 'Counsellors Council of India (CCI)'], ['Associate Counsellor', 'World Mental Health Care Association'], ['Trained', 'Imago Relationship Therapist'], ['Certified', 'Shadow Mastery Coach'], ['Award', 'Lifetime Achievement Award, Mental Health Awareness']]
const FOCUS = ['CBT', 'REBT', 'Behavioural Modification', 'Imago Relationship Therapy', 'Shadow Mastery Coaching', 'Inner Child Healing', 'Family & Couple Counselling']
const STORIES = [
  ['I truly appreciate the patience, understanding, and warmth you brought into every session. Your guidance made me feel safe, supported, and confident to step outside my comfort zone.', 'Sai Divya'],
  ['Thank you for helping me realise that I wasn\'t weak, but simply suppressing who I truly am. You helped me embrace my \'Version 2\' and understand myself better.', 'Sherin Joseph'],
  ['Thank you Dr. Arthi for creating a safe space to open up. Your guidance helped me understand myself better and see my marriage more positively.', 'Sneha Priya V.'],
  ['Thank you so much Arthi maam. In a short time, you gave me so much clarity and helped me change my perceptions positively.', 'Keerthi'],
]
const FAQS = [
  ['Do I need therapy, or should I start with Clarity Connect?', 'If you\'re unsure where to begin, Clarity Connect is the ideal first step. It helps us understand your concerns and guide you toward the most suitable service.'],
  ['Are sessions conducted online?', 'Yes. All sessions are online, so you can access support from anywhere in India or abroad.'],
  ['How do I know which service is right for me?', 'Try the 60-second self-check above, or book Clarity Connect. We\'ll guide you based on your needs and goals.'],
  ['Can I join a programme without taking therapy?', 'Yes. The self-paced course, webinars, masterclasses and emotional wellness programmes can be joined on their own.'],
  ['Are sessions confidential?', 'Absolutely. Every conversation is held in a safe, respectful and confidential space.'],
]





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
