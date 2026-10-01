import { useEffect, useRef, useState } from "react";
import logo from "../../../public/img/logo.webp";

const HEART_X = 49.3;
const HEART_Y = 31;

const PINK = "#E8708A";
const SAGE = "#9FB380";
const INK = "#241519";
const PAPER = "#FFFAF8";

const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";

export default function MindfullyLoader({
  logoSrc = logo,
  minDuration = 5500,
  waitForWindowLoad = true,
  onComplete,
}) {
  const [imgReady, setImgReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  const loadedRef = useRef(
    !waitForWindowLoad ||
      typeof document === "undefined" ||
      document.readyState === "complete"
  );

  // Preload the logo so the sequence starts with the image ready
  useEffect(() => {
    const im = new Image();
    im.onload = im.onerror = () => setImgReady(true);
    im.src = logoSrc;
    const fallback = setTimeout(() => setImgReady(true), 2000);
    return () => clearTimeout(fallback);
  }, [logoSrc]);

  // Track real page load
  useEffect(() => {
    if (loadedRef.current) return;
    const onLoad = () => (loadedRef.current = true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Progress: eased over minDuration, parked at 92% until the page is ready
  useEffect(() => {
    if (!imgReady) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / minDuration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      const cap = loadedRef.current ? 100 : 92;
      setProgress(Math.min(eased * 100, cap));
      if (t >= 1 && loadedRef.current) {
        setProgress(100);
        setExiting(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [imgReady, minDuration]);

  // Unmount after the exit animation
  useEffect(() => {
    if (!exiting) return;
    const id = setTimeout(() => {
      setGone(true);
      onComplete?.();
    }, 1900);
    return () => clearTimeout(id);
  }, [exiting, onComplete]);

 // Lock page scroll while the loader is up
useEffect(() => {
  if (gone) return;
  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = prev;
  };
}, [gone]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`ml-root fixed inset-0 z-[9999] overflow-hidden ${
        exiting ? "ml-exit" : ""
      }`}
      style={{ background: PAPER }}
    >
      <span className="sr-only">Loading Mindfully You</span>
      <style>{css}</style>

      {imgReady && (
        <div className="ml-content absolute inset-0 flex flex-col items-center justify-center">
          {/* Anchor: same box as the logo; effects grow from the heart point */}
          <div
            className="relative w-[min(56vw,290px)]"
            style={{ "--hx": `${HEART_X}%`, "--hy": `${HEART_Y}%` }}
          >
            <div className="ml-wash absolute" aria-hidden />

            {[
              [0, PINK],
              [1.6, SAGE],
              [3.2, PINK],
            ].map(([delay, color]) => (
              <div
                key={delay}
                aria-hidden
                className="ml-rip absolute"
                style={{ animationDelay: `${1 + delay}s`, borderColor: color }}
              />
            ))}

            <div className="ml-seed absolute" aria-hidden />

            <div className="ml-breath relative">
              <img
                src={logoSrc}
                alt=""
                aria-hidden
                className="ml-logo block w-full"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>

          {/* Breath cue + progress */}
          <div className="ml-foot mt-12 flex flex-col items-center gap-4">
            <div
              className="grid h-7 place-items-center text-lg italic tracking-wide sm:text-xl"
              style={{ fontFamily: SERIF, color: "rgba(36,21,25,.72)" }}
            >
              <span className="ml-txt ml-txt-a col-start-1 row-start-1">Breathe in</span>
              <span className="ml-txt ml-txt-b col-start-1 row-start-1">Breathe out</span>
            </div>
            <div
              className="h-px w-40 overflow-hidden sm:w-56"
              style={{ background: "rgba(36,21,25,.1)" }}
            >
              <div
                className="h-full origin-left transition-transform duration-300 ease-out"
                style={{
                  transform: `scaleX(${progress / 100})`,
                  background: `linear-gradient(90deg, ${PINK}, ${SAGE})`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const css = `
@property --b { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
@property --r { syntax: '<length>';     inherits: false; initial-value: 0px; }

.ml-root { --d: min(80vmin, 640px); }

/* shared: effects centred on the heart point */
.ml-wash, .ml-rip {
  left: var(--hx); top: var(--hy);
  width: var(--d); height: var(--d);
  margin: calc(var(--d) / -2) 0 0 calc(var(--d) / -2);
  border-radius: 9999px;
}

/* 1. seed of light */
.ml-seed {
  left: var(--hx); top: var(--hy);
  width: 12px; height: 12px; margin: -6px 0 0 -6px;
  border-radius: 9999px; opacity: 0;
  background: ${PINK};
  box-shadow: 0 0 22px 6px ${PINK}66, 0 0 64px 18px ${SAGE}55;
  animation: ml-seed 1.3s ease-in-out .25s both;
}

/* 2. bloom: the logo comes into focus from the heart outward */
.ml-logo {
  --b: 140%;
  -webkit-mask-image: radial-gradient(circle farthest-corner at var(--hx) var(--hy), #000 calc(var(--b) - 30%), transparent var(--b));
          mask-image: radial-gradient(circle farthest-corner at var(--hx) var(--hy), #000 calc(var(--b) - 30%), transparent var(--b));
  animation: ml-bloom 1.7s cubic-bezier(.22,.7,.2,1) .8s both;
}

/* 3. soft wash + ripples */
.ml-wash {
  background: radial-gradient(circle, rgba(232,112,138,.18), rgba(159,179,128,.12) 42%, transparent 68%);
  animation: ml-fade 1.6s ease-out 1s both, ml-wash 3.2s ease-in-out 2.3s infinite;
}
.ml-rip {
  border: 1px solid; opacity: 0;
  animation: ml-ripple 4.8s cubic-bezier(.2,.6,.3,1) infinite backwards;
}

/* 4. breath: logo + cue move together (3.2s cycle) */
.ml-breath { transform-origin: var(--hx) var(--hy); animation: ml-breath 3.2s ease-in-out 2.3s infinite; }
.ml-txt { opacity: 0; }
.ml-txt-a { animation: ml-txt-a 3.2s ease-in-out 2.3s infinite backwards; }
.ml-txt-b { animation: ml-txt-b 3.2s ease-in-out 2.3s infinite backwards; }
.ml-foot { animation: ml-fade 1s ease-out 2s both; }

/* ---------- exit: the screen opens outward from the heart ---------- */
.ml-content { transition: transform 1.7s cubic-bezier(.65,0,.35,1), opacity 1s ease .35s; }
.ml-exit .ml-content { transform: scale(1.06); opacity: 0; }
.ml-exit {
  -webkit-mask-image: radial-gradient(circle at 50% 42%, transparent calc(var(--r) - 14vmax), #000 var(--r));
          mask-image: radial-gradient(circle at 50% 42%, transparent calc(var(--r) - 14vmax), #000 var(--r));
  animation: ml-open 1.7s cubic-bezier(.65,0,.35,1) .1s both;
}

/* ---------- keyframes (base styles are the final state) ---------- */
@keyframes ml-seed {
  0%   { opacity: 0; transform: scale(0); }
  35%  { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(2.6); }
}
@keyframes ml-bloom  { from { --b: 0%; opacity: 0; filter: blur(12px); } }
@keyframes ml-fade   { from { opacity: 0; } }
@keyframes ml-wash   { 50% { transform: scale(1.12); } }
@keyframes ml-ripple {
  0%   { opacity: 0;   transform: scale(.12); }
  8%   { opacity: .5; }
  100% { opacity: 0;   transform: scale(1); }
}
@keyframes ml-breath { 50% { transform: scale(1.035); } }
@keyframes ml-txt-a {
  0%        { opacity: 0; filter: blur(4px); }
  12%, 38%  { opacity: 1; filter: blur(0); }
  50%, 100% { opacity: 0; filter: blur(4px); }
}
@keyframes ml-txt-b {
  0%, 50%   { opacity: 0; filter: blur(4px); }
  62%, 88%  { opacity: 1; filter: blur(0); }
  100%      { opacity: 0; filter: blur(4px); }
}
@keyframes ml-open { to { --r: 150vmax; } }

/* ---------- reduced motion: static logo, plain fade out ---------- */
@media (prefers-reduced-motion: reduce) {
  .ml-root, .ml-root * { animation: none !important; }
  .ml-rip, .ml-seed, .ml-txt-b { display: none; }
  .ml-txt-a { opacity: 1; }
  .ml-root { transition: opacity .5s ease; }
  .ml-root.ml-exit { opacity: 0; -webkit-mask-image: none; mask-image: none; }
  .ml-exit .ml-content { transform: none; }
}
`;