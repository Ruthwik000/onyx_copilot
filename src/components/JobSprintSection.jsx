import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import HumanCharacter from './HumanCharacter'

const milestones = [
  {
    number: '01',
    title: 'Foundation',
    subtitle: 'Profile audit, ATS resume reconstruction, and goal setting with mentor.',
    tag: 'DAY 1-3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M8 5v14l11-7L8 5z" fill="#A78BFA" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Activation',
    subtitle: 'Automated application engine starts. Initial screenings secured via AI outreach.',
    tag: 'DAY 3-7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2L4 7v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V7l-8-5z" stroke="#A78BFA" strokeWidth="1.5" />
        <path d="M12 8v4l3 2" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Momentum',
    subtitle: 'First round technicals and product rounds. Intensive mock sessions with mentor.',
    tag: 'DAY 7-14',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M3 17l6-6 4 4 8-10" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Closure',
    subtitle: 'Final rounds and negotiation. Multiple offers synchronized for maximum leverage.',
    tag: 'DAY 14-21',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="#A78BFA" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// Card positions for zigzag layout — increased vertical spacing
const cardPositions = [
  { left: '2%', top: 0 },
  { left: '52%', top: 220 },
  { left: '2%', top: 440 },
  { left: '52%', top: 660 },
]

function MilestoneCard({ milestone, position, isActive, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      animate={isActive ? {
        borderColor: 'rgba(124,58,237,0.5)',
        boxShadow: '0 0 40px rgba(124,58,237,0.15)',
      } : {
        borderColor: 'rgba(124,58,237,0.15)',
        boxShadow: '0 0 0px rgba(124,58,237,0)',
      }}
      className="glass-card rounded-2xl p-7 md:p-8 cursor-default relative group 
        hover:border-violet-500/40 transition-all duration-500"
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: '46%',
        minHeight: '170px',
      }}
    >
      {/* Ghost number + icon row */}
      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl md:text-6xl font-black text-violet-500/15 select-none leading-none">
          {milestone.number}
        </span>
        <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-1">
          {milestone.icon}
        </div>
      </div>

      <h4 className="text-lg md:text-xl font-bold text-white leading-tight">{milestone.title}</h4>
      <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{milestone.subtitle}</p>

      {/* Tag badge */}
      <span className="inline-block mt-4 px-3 py-1 rounded-full text-[10px] font-semibold 
        bg-violet-500/20 text-violet-300 border border-violet-500/30">
        {milestone.tag}
      </span>

      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-green-500 
          flex items-center justify-center shadow-lg shadow-green-500/40"
      >
        <span className="text-white text-xs font-bold">✓</span>
      </motion.div>
    </motion.div>
  )
}

export default function JobSprintSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const [active, setActive] = useState({ 0: false, 1: false, 2: false, 3: false })
  const [isWalking, setIsWalking] = useState(false)
  const [isAtEnd, setIsAtEnd] = useState(false)

  // Character follows the SVG path progress  
  const pathProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1])

  useEffect(() => {
    let walkTimeout
    const unsub = pathProgress.on('change', (v) => {
      setIsWalking(true)
      clearTimeout(walkTimeout)
      walkTimeout = setTimeout(() => setIsWalking(false), 200)

      if (v > 0.1) setActive(prev => ({ ...prev, 0: true }))
      if (v > 0.35) setActive(prev => ({ ...prev, 1: true }))
      if (v > 0.6) setActive(prev => ({ ...prev, 2: true }))
      if (v > 0.85) {
        setActive(prev => ({ ...prev, 3: true }))
        setIsAtEnd(true)
      }
    })
    return () => {
      unsub()
      clearTimeout(walkTimeout)
    }
  }, [pathProgress])

  // Animate the character position along the path
  const charX = useTransform(pathProgress, [0, 0.25, 0.5, 0.75, 1], ['5%', '55%', '10%', '55%', '55%'])
  const charY = useTransform(pathProgress, [0, 0.25, 0.5, 0.75, 1], [30, 260, 480, 680, 780])

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-28 md:py-40 px-8 md:px-16 lg:px-20 bg-[#08080F] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-violet-400 uppercase tracking-widest text-center mb-4"
        >
          The Sprint
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-5"
        >
          AI-Powered Job Sprint
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-center text-base leading-relaxed max-w-lg mx-auto mb-8"
        >
          Your journey from application to offer — automated.
        </motion.p>

        {/* ===== DESKTOP ZIGZAG LAYOUT ===== */}
        <div className="hidden md:block relative mt-20" style={{ height: '920px' }}>
          {/* Curved dashed SVG path connecting cards in zigzag */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 920"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* S-curve path from card 1 → card 2 → card 3 → card 4 */}
            <motion.path
              d="M 200 120 C 300 120, 500 120, 560 240 C 620 360, 400 380, 200 460 C 80 510, 80 540, 200 580 C 350 630, 500 640, 560 700 C 620 760, 620 820, 560 880"
              stroke="url(#pathGrad)"
              strokeWidth="2.5"
              strokeDasharray="10 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            {/* Connector dots at path junctions */}
            <circle cx="560" cy="240" r="6" fill="#7C3AED" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="460" r="6" fill="#8B5CF6" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="560" cy="700" r="6" fill="#7C3AED" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
            {/* Moving particle along the path */}
            <circle r="4" fill="#A78BFA" opacity="0.9">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M 200 120 C 300 120, 500 120, 560 240 C 620 360, 400 380, 200 460 C 80 510, 80 540, 200 580 C 350 630, 500 640, 560 700 C 620 760, 620 820, 560 880"
              />
            </circle>
          </svg>

          {/* Human Character */}
          <motion.div
            className="absolute z-20 hidden lg:block"
            style={{ left: charX, top: charY }}
          >
            <HumanCharacter isWalking={isWalking} isAtEnd={isAtEnd} />
          </motion.div>

          {/* Milestone Cards */}
          {milestones.map((m, i) => (
            <MilestoneCard
              key={i}
              index={i}
              milestone={m}
              position={cardPositions[i]}
              isActive={active[i]}
            />
          ))}

          {/* Subtle glow spots */}
          <div className="absolute w-40 h-40 rounded-full bg-violet-500/5 blur-3xl" style={{ left: '40%', top: '15%' }} />
          <div className="absolute w-32 h-32 rounded-full bg-violet-700/5 blur-3xl" style={{ left: '20%', top: '60%' }} />
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden relative mt-14">
          {/* Vertical dashed track */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-violet-500/30" />

          {/* Connector dots */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/60 animate-pulse"
              style={{ left: '18px', top: `${25 + i * 33}%` }}
            />
          ))}

          {/* Boxes stacked */}
          <div className="flex flex-col gap-8 pl-14">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-7 relative"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-4xl font-black text-violet-500/15 select-none leading-none">
                    {m.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-1">
                    {m.icon}
                  </div>
                </div>
                <h4 className="text-base font-bold text-white">{m.title}</h4>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{m.subtitle}</p>
                <span className="inline-block mt-4 px-3 py-1 rounded-full text-[10px] font-semibold 
                  bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {m.tag}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: active[i] ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 
                    flex items-center justify-center shadow-lg shadow-green-500/40"
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
