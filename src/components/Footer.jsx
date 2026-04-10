export default function Footer() {
  const links = ['Privacy Policy', 'Terms of Service', 'Twitter', 'LinkedIn', 'GitHub']

  return (
    <footer className="bg-[#08080F] border-t border-white/[0.06] py-14 px-8 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="font-bold text-white text-lg flex items-center justify-center md:justify-start gap-1.5">
            <span className="text-violet-400">●</span> Onyx JobCopilot
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
            © 2024 Onyx JobCopilot. Built in the Kinetic Void.
          </p>
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-zinc-500 hover:text-violet-400 transition-colors duration-200 cursor-pointer"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
