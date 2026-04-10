export default function HumanCharacter({ isWalking, isAtEnd }) {
  return (
    <svg width="60" height="90" viewBox="0 0 60 90">
      <defs>
        <radialGradient id="charGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </radialGradient>
      </defs>

      {/* Glow beneath feet */}
      <ellipse cx="30" cy="88" rx="14" ry="4" fill="#7C3AED" opacity="0.4"
        style={{ filter: 'blur(4px)' }} />

      {/* Head */}
      <circle cx="30" cy="12" r="10" fill="url(#charGrad)" />

      {/* Face */}
      <circle cx="27" cy="11" r="1.5" fill="white" opacity="0.9" />
      <circle cx="33" cy="11" r="1.5" fill="white" opacity="0.9" />
      <path d="M27 15 Q30 17 33 15" stroke="white" strokeWidth="1" fill="none" opacity="0.9" />

      {/* Neck */}
      <rect x="27" y="22" width="6" height="5" rx="2" fill="#8B5CF6" />

      {/* Body */}
      <rect x="18" y="27" width="24" height="22" rx="8" fill="url(#charGrad)" />

      {/* Collar */}
      <path d="M26 27 L30 34 L34 27" fill="none" stroke="#C4B5FD" strokeWidth="1.5" />

      {/* Left Arm */}
      <g className={isWalking ? 'arm-left' : ''} style={{ transformOrigin: '18px 30px' }}>
        <line x1="18" y1="30" x2="6" y2="48" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="6" cy="50" r="4" fill="#A78BFA" />
        {/* Briefcase */}
        <rect x="0" y="52" width="12" height="8" rx="2" fill="#7C3AED" stroke="#C4B5FD" strokeWidth="1" />
        <line x1="4" y1="52" x2="4" y2="50" stroke="#C4B5FD" strokeWidth="1" />
        <line x1="8" y1="52" x2="8" y2="50" stroke="#C4B5FD" strokeWidth="1" />
      </g>

      {/* Right Arm */}
      <g className={isWalking ? 'arm-right' : ''} style={{ transformOrigin: '42px 30px' }}>
        <line x1="42" y1="30" x2="54" y2="48" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="54" cy="50" r="4" fill="#A78BFA" />
      </g>

      {/* Left Leg */}
      <g className={isWalking ? 'leg-left' : ''} style={{ transformOrigin: '25px 49px' }}>
        <line x1="25" y1="49" x2="20" y2="70" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="18" cy="73" rx="7" ry="4" fill="#6D28D9" />
      </g>

      {/* Right Leg */}
      <g className={isWalking ? 'leg-right' : ''} style={{ transformOrigin: '35px 49px' }}>
        <line x1="35" y1="49" x2="40" y2="70" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="42" cy="73" rx="7" ry="4" fill="#6D28D9" />
      </g>

      {/* Stars when at end */}
      {isAtEnd && (
        <>
          <text x="10" y="5" fontSize="10" className="animate-bounce">⭐</text>
          <text x="42" y="3" fontSize="8" className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</text>
        </>
      )}
    </svg>
  )
}
