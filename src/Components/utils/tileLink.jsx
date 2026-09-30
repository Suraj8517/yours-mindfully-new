import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Ctx } from './ctx'

export function TileLink({ int }) {
  const set = useContext(Ctx)
  const ref = useRef(null)
  useEffect(() => { const a = ref.current?.parentElement; const h = () => set(int); a?.addEventListener('click', h); return () => a?.removeEventListener('click', h) }, [int, set])
  return <i ref={ref} className="hidden" />
}