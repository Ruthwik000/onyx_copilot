import { motion } from 'framer-motion'

const testimonials = [
  {
    initials: 'RS', name: 'Ravi Shankar Reddy',
    role: 'Software Engineer @ Google',
    quote: "Onyx's ATS optimization took my resume score from 61% to 98% overnight. Got 3 interview calls in the first week itself.",
    tag: 'Placed in 18 days',
  },
  {
    initials: 'LP', name: 'Lakshmi Prasanna Devi',
    role: 'Product Manager @ Flipkart',
    quote: 'The mentor sessions were game-changing. My mentor from Stripe literally walked me through the exact questions asked in my final round.',
    tag: '5x faster than solo search',
  },
  {
    initials: 'VS', name: 'Venkata Subrahmanyam',
    role: 'SDE-2 @ Amazon',
    quote: 'I was applying for 6 months with zero results. After joining Onyx, I had my offer letter in 3 weeks. This platform is absolutely unreal.',
    tag: 'Offer: ₹42 LPA',
  },
  {
    initials: 'SK', name: 'Sravanthi Kumari',
    role: 'Data Scientist @ Microsoft',
    quote: 'The job portal auto-apply feature sent my profile to 50+ companies while I focused on interview prep. Absolute time saver.',
    tag: '50+ applications in 1 day',
  },
  {
    initials: 'NB', name: 'Naga Bhaskar Rao',
    role: 'DevOps Engineer @ Infosys',
    quote: 'The mock interview circuits are incredibly realistic. My mentor knew exactly what TCS and Infosys ask. Cleared it in first attempt.',
    tag: 'Placed in 21 days',
  },
  {
    initials: 'PG', name: 'Padmavathi Goud',
    role: 'UI/UX Designer @ Swiggy',
    quote: 'From zero callbacks to 4 design round calls in 2 weeks. The profile maintenance feature kept my LinkedIn always visible.',
    tag: '4 calls in 2 weeks',
  },
  {
    initials: 'KM', name: 'Krishna Murthy Varma',
    role: 'Full Stack Dev @ Zomato',
    quote: "Onyx's copilot program gave me a crystal-clear roadmap — what to build, what to study, who to contact. Landed the job in 28 days.",
    tag: 'Roadmap to Offer: 28 days',
  },
  {
    initials: 'AS', name: 'Annapurna Sridhar',
    role: 'Cloud Architect @ TCS',
    quote: 'Salary went from a ₹8 LPA offer to ₹17 LPA after the negotiation coaching session with my mentor. Worth every single rupee.',
    tag: '2x salary negotiated',
  },
]

const allCards = [...testimonials, ...testimonials]

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-80 glass-card rounded-2xl p-7 hover:-translate-y-2 
      hover:border-violet-500/40 transition-all duration-300 cursor-default group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 
          flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{t.name}</p>
          <p className="text-xs text-violet-400 mt-0.5">{t.role}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm">★</span>
        ))}
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed italic">"{t.quote}"</p>
      <span className="mt-5 inline-block px-3 py-1 rounded-full text-[10px] font-semibold 
        bg-violet-500/15 text-violet-300 border border-violet-500/25">
        {t.tag}
      </span>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28 md:py-40 bg-[#08080F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-violet-400 uppercase tracking-widest mb-4"
        >
          Success Stories
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          What Our Students Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 mt-4"
        >
          Real results from real people. No filters, no BS.
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="marquee-track overflow-hidden">
        <div
          className="marquee-inner flex gap-6"
          style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
        >
          {allCards.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
