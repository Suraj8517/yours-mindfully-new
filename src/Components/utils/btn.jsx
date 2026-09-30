
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Ctx } from './ctx'

export default function Btn({ children, href = '#begin', kind = 'cta', dark, interest, className = '', ...p }) {
  const setInterest = useContext(Ctx)
  const k = {
    cta: dark ? 'bg-rose-lite text-[#1B0F12] hover:bg-[#F6A6B6]' : 'bg-rose text-white hover:bg-[#B2425B]',
    line: `border-current bg-transparent ${dark ? 'hover:bg-onever hover:text-ever hover:border-onever' : 'hover:bg-ink hover:text-paper hover:border-ink'}`,
  }[kind]
  return (
    <a href={href} onClick={() => interest && setInterest(interest)} {...p}
      className={`group inline-flex min-h-[52px] items-center justify-center gap-[.6em] rounded-full border-[1.5px] border-transparent px-6 py-[.8em] font-body text-base font-bold leading-[1.1] no-underline transition hover:-translate-y-0.5 ${k} ${className}`}>
      {children}{kind === 'cta' && <span className="transition group-hover:translate-x-1">→</span>}
    </a>
  )
}