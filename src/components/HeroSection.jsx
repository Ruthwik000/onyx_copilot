import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay }
  })
}

const barHeights = [50, 75, 40, 90, 65, 80, 55, 70, 95, 60, 85, 45]

export default function HeroSection() {
  const heroChars = '5x Speed.'.split('')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#08080F] px-8 md:px-16 lg:px-20 pt-20">
      {/* Radial gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.15)_0%,_transparent_70%)]" />

      {/* Particles */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-violet-500/40 bg-violet-500/8 
            rounded-full px-5 py-2 text-xs text-violet-300 uppercase tracking-widest mb-8"
        >
          ✦ THE INTELLIGENT MONOLITH IS HERE
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-[clamp(42px,7vw,92px)] font-black leading-none tracking-tighter text-white mb-2"
        >
          Land Your Job at
          <br />
          <span className="shimmer-text inline-flex">
            {heroChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mt-6 mb-10"
        >
          AI-optimized resumes. Auto-applied jobs. Personal mentors. From application to offer — on autopilot.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-violet-600 to-violet-700 text-white font-bold 
              rounded-full px-10 py-4 text-base transition-all duration-300 
              hover:shadow-2xl hover:shadow-violet-500/50 cursor-pointer"
          >
            Accelerate Your Career
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border border-white/20 text-white rounded-full px-10 py-4 text-base 
              hover:border-violet-500/60 hover:bg-violet-500/10 transition-all duration-300 cursor-pointer"
          >
            Watch Demo ▶
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="flex items-center gap-8 md:gap-12 justify-center mt-14 mb-10 flex-wrap"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-extrabold text-violet-300">
              <CountUp end={98} suffix="%" />
            </span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">ATS Score</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-extrabold text-violet-300">
              <CountUp end={5} suffix="x" />
            </span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Faster Placement</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-extrabold text-violet-300">
              <CountUp end={2400} suffix="+" />
            </span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Students Placed</span>
          </div>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-3xl mx-auto mt-8 rounded-2xl overflow-hidden glass-card border border-violet-500/20"
        >
          {/* Browser bar */}
          <div className="bg-[#0F0F1A] px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 bg-white/5 rounded-full h-5 ml-3 flex items-center px-3">
              <span className="text-[10px] text-zinc-600">onyx-jobcopilot.ai/dashboard</span>
            </div>
          </div>

          {/* Browser body */}
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: 98, suf: '%', label: 'ATS SCORE' },
                { num: 12, suf: '', label: 'ACTIVE LEADS' },
                { num: 4, suf: '', label: 'INTERVIEWS' },
              ].map((s, i) => (
                <div key={i} className="bg-[#1A1A2E] rounded-xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-violet-300">
                    <CountUp end={s.num} suffix={s.suf} />
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bar chart visualization */}
            <div className="col-span-3 h-32 bg-[#1A1A2E] rounded-xl mt-3 overflow-hidden relative flex items-end gap-1.5 px-4 pb-3 pt-2">
              {barHeights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, #7C3AED, #A78BFA)`,
                    transformOrigin: 'bottom',
                    opacity: 0.6 + (h / 100) * 0.4,
                  }}
                />
              ))}
              <div className="absolute top-2 left-4 text-[10px] text-zinc-500 uppercase tracking-widest">Weekly Activity</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
