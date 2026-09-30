export const Wrap = ({ children, className = '' }) => <div className={`mx-auto max-w-[1240px] px-[clamp(16px,4vw,40px)] ${className}`}>{children}</div>
export const It = ({ children, c = 'text-rose' }) => <span className={`font-accent italic font-normal tracking-[-.01em] ${c}`}>{children}</span>
export const Kicker = ({ children, dark }) => <p className={`text-[.74rem] font-bold uppercase leading-none tracking-[.2em] ${dark ? 'text-rose-lite' : 'text-rose'}`}>{children}</p>
export const Lede = ({ children, dark }) => <p className={`max-w-[56ch] text-[clamp(1.05rem,1.4vw,1.22rem)] ${dark ? 'text-onever-muted' : 'text-muted'}`}>{children}</p>
export const Sec = ({ id, dark, className = '', style, children }) => (
  <section id={id} style={style} className={`py-[clamp(80px,11vw,150px)] ${dark ? 'bg-ever text-onever' : ''} ${className}`}>{children}</section>
)