import { useState } from "react"
import { WA, SHEET_URL } from "./utils/content/const"
import { Wrap, It, Kicker, Lede, Sec } from "./utils/heroUtils"

export default function Final({ interest, setInterest }) {
  const [f, setF] = useState({ name: '', time: 'Any time', where: '', note: '' })
  const [err, setErr] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState('')
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value })

  // Message field is optional: location and note are only added when filled in
  const waMsg = `Hi, I'm ${f.name.trim()}. I'm interested in: ${interest}. Best time to reach me: ${f.time}.${f.where.trim() ? ` Based in: ${f.where.trim()}.` : ''}${f.note.trim() ? ` ${f.note.trim()}` : ''}`
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`

  const send = async (e) => {
    e.preventDefault()
    if (!f.name.trim()) return setErr(true)
    setErr(false)
    setError('')

    const params = new URLSearchParams({
      name: f.name.trim(),
      interested: interest,
      time: f.time,
      location: f.where.trim(),
      message: f.note.trim(), 
    })

    setSending(true)
    try {
      const res = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      const text = await res.text()
      let data = {}
      try { data = JSON.parse(text) } catch { /* non-JSON reply */ }
      if (data.result !== 'success') throw new Error(data.error || 'Submission failed')
      setSubmitted(true)
    } catch (ex) {
      console.error(ex)
      setError('Something went wrong saving your details, but your WhatsApp message is ready to send.')
    } finally {
      setSending(false)
      // Show the loader, then redirect to WhatsApp after 3 seconds.
      // Redirects even if the sheet save failed, so the lead isn't lost.
      setRedirecting(true)
      setTimeout(() => { window.location.href = waLink }, 3000)
    }
  }

  const inp = 'w-full rounded-xl border-[1.5px] border-line bg-card px-[.9em] py-[.8em] font-[inherit] text-base text-ink focus:border-rose focus:outline-none'
  const lbl = 'text-[.88rem] font-bold'
  const btn = 'group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-[.6em] rounded-full border-[1.5px] border-transparent bg-rose px-6 py-[.8em] font-body text-base font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-[#B2425B] disabled:cursor-not-allowed disabled:opacity-60'
  const contact = [['WhatsApp / phone', '+91 88256 11379', 'tel:+918825611379'], ['Email', 'mindfullyyouu@gmail.com', 'mailto:mindfullyyouu@gmail.com'], ['Instagram', '@mindfullyyouuu', 'https://instagram.com/mindfullyyouuu']]

  return (
    <Sec id="begin" dark className="relative overflow-hidden rounded-t-[28px] before:pointer-events-none before:absolute before:-right-[120px] before:-top-[120px] before:size-[520px] before:rounded-full before:content-[''] before:[background:radial-gradient(circle,rgba(224,105,127,.35),transparent_65%)]">
      <Wrap className="relative">
        <div className="grid grid-cols-[1.05fr_.95fr] items-start gap-[clamp(32px,5vw,80px)] max-[900px]:grid-cols-1">
          <div className="grid gap-5 ">
            <Kicker dark>Begin at your own pace</Kicker>
            <h2 className="!text-[clamp(2.6rem,6vw,5rem)] leading-[1]">Your first step is <It c="text-rose-lite">one conversation</It>.</h2>
            <Lede dark>Your emotional well-being deserves the same care as your physical health. Tell us what you're looking for and we'll reply to arrange a time.</Lede>
            <div className="mt-10 grid gap-[18px]">
              {contact.map(([k, v, h]) => <div key={k} className="grid gap-1"><small className="text-[.7rem] font-bold uppercase leading-none tracking-[.16em] text-onever-muted">{k}</small><a href={h} className="font-display text-[1.25rem] font-medium leading-[1.2] no-underline hover:text-rose-lite">{v}</a></div>)}
            </div>
          </div>

          {redirecting ? (
            <div role="status" aria-live="polite" className="grid justify-items-center gap-4 rounded-[28px] bg-paper p-[clamp(24px,3vw,40px)] text-center text-ink">
              <div className="size-12 animate-spin rounded-full border-4 border-line border-t-rose" />
              <h3 className="text-[1.8rem]">Thank you, {f.name.trim()}.</h3>
              <p>Taking you to WhatsApp to send your message…</p>
              <a href={waLink} className="text-[.9rem] font-semibold text-rose underline">Not redirected? Tap here</a>
            </div>
          ) : submitted ? (
            <div className="grid gap-4 rounded-[28px] bg-paper p-[clamp(24px,3vw,40px)] text-ink">
              <h3 className="text-[1.8rem]">Thank you, {f.name.trim()}.</h3>
              <p>We've received your request and will get back to you soon. If WhatsApp didn't open, tap below.</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={btn}>Open WhatsApp <span className="transition group-hover:translate-x-1">→</span></a>
            </div>
          ) : (
            <form onSubmit={send} noValidate className="grid gap-4 rounded-[28px] bg-paper p-[clamp(24px,3vw,40px)] text-ink">
              <h3 className="text-[1.8rem]">Request a callback</h3>
              <div className="grid gap-1.5"><label className={lbl} htmlFor="n">Your name</label><input id="n" name="name" className={inp} value={f.name} onChange={up('name')} autoComplete="name" />{err && <p className="text-[.9rem] font-semibold text-rose">Please add your name so we know who to reply to.</p>}</div>
              <div className="grid gap-1.5"><label className={lbl} htmlFor="i">I'm interested in</label>
                <select id="i" className={inp} value={interest} onChange={(e) => setInterest(e.target.value)}>{['Clarity Connect (30 min)', 'Personal Growth & Healing', 'Relationship Wellness', 'Emotional Wellness Programs', 'Journey to Yourself course', 'Joining the WhatsApp community', 'Something else'].map((o) => <option key={o}>{o}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-3.5 max-[480px]:grid-cols-1">
                <div className="grid gap-1.5"><label className={lbl} htmlFor="t">Best time to reach you</label><select id="t" className={inp} value={f.time} onChange={up('time')}>{['Any time', 'Morning', 'Afternoon', 'Evening'].map((o) => <option key={o}>{o}</option>)}</select></div>
                <div className="grid gap-1.5"><label className={lbl} htmlFor="w">Where you're based</label><input id="w" className={inp} value={f.where} onChange={up('where')} /></div>
              </div>
              <div className="grid gap-1.5"><label className={lbl} htmlFor="m">Anything you'd like us to know (optional)</label><textarea id="m" rows="3" className={inp} value={f.note} onChange={up('note')} /></div>
              {error && <p className="text-[.9rem] font-semibold text-rose">{error}</p>}
              <button disabled={sending} className={btn}>{sending ? 'Sending…' : <>Request callback <span className="transition group-hover:translate-x-1">→</span></>}</button>
              <p className="text-[.86rem] text-muted">Your details are sent securely to our team. We'll reach out at your preferred time.</p>
            </form>
          )}
        </div>
      </Wrap>
    </Sec>
  )
}