import { memo, useMemo } from 'react'

/**
 * Custom decorations config allowing the user to provide their own images anytime!
 */
export const decorationAssets = {
  lily: '/decorations/lily_flower.png',
  roses: '/decorations/roses_bouquet.png',
  bow: '/decorations/satin_bow.png',
  cherries: '/decorations/cherries.png',
  safetyPin: '/decorations/safety_pin.svg',
  doodleHeart: '/decorations/doodle_heart.svg',
}

interface DecorationProps {
  className?: string
  style?: React.CSSProperties
  alt?: string
}

export const SafetyPin = memo(function SafetyPin({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={`safety-pin-wrapper ${className}`} style={style} aria-hidden="true">
      <svg
        viewBox="0 0 120 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="safety-pin-svg"
      >
        <defs>
          <filter id="pin-filter" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.45)" />
          </filter>
          <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="90%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="needle-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <g filter="url(#pin-filter)">
          {/* Back needle */}
          <path d="M 40 50 L 76 218" stroke="url(#silver-grad)" strokeWidth="5.5" strokeLinecap="round" />
          {/* Bottom coil */}
          <circle cx="76" cy="224" r="14" stroke="url(#silver-grad)" strokeWidth="5" fill="none" />
          <circle cx="76" cy="224" r="9" stroke="#334155" strokeWidth="1.5" fill="none" opacity="0.4" />
          {/* Front needle */}
          <path d="M 66 222 L 35 55" stroke="url(#silver-grad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 66 222 L 35 55" stroke="url(#needle-shine)" strokeWidth="1.8" strokeLinecap="round" />
          {/* Clasp Head */}
          <path
            d="M 22 20 C 22 10, 32 6, 44 6 C 56 6, 62 12, 62 24 L 58 64 C 58 72, 48 76, 40 76 C 30 76, 22 70, 22 60 Z"
            fill="url(#silver-grad)"
          />
          {/* Clasp interior recess */}
          <path
            d="M 28 26 C 28 17, 35 14, 44 14 C 50 14, 54 18, 54 26 L 50 56 C 50 62, 44 65, 38 65 C 30 65, 28 60, 28 54 Z"
            fill="#475569"
            opacity="0.35"
          />
          {/* Specular sheen */}
          <ellipse cx="40" cy="25" rx="3" ry="8" fill="#ffffff" opacity="0.75" transform="rotate(-15 40 25)" />
        </g>
      </svg>
    </div>
  )
})

export const SatinBow = memo(function SatinBow({ className = '', style, alt = 'Red satin ribbon bow' }: DecorationProps) {
  return (
    <div className={`satin-bow-wrapper ${className}`} style={style}>
      <img
        src={decorationAssets.bow}
        alt={alt}
        className="satin-bow-img"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
})

export const LilyFlower = memo(function LilyFlower({ className = '', style, alt = 'Velvet red lily flower' }: DecorationProps) {
  return (
    <div className={`lily-flower-wrapper ${className}`} style={style}>
      <img
        src={decorationAssets.lily}
        alt={alt}
        className="lily-flower-img"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
})

export const RosesBouquet = memo(function RosesBouquet({ className = '', style, alt = 'Red roses bouquet' }: DecorationProps) {
  return (
    <div className={`roses-bouquet-wrapper ${className}`} style={style}>
      <img
        src={decorationAssets.roses}
        alt={alt}
        className="roses-bouquet-img"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
})

export const Cherries = memo(function Cherries({ className = '', style, alt = 'Glossy cherries' }: DecorationProps) {
  return (
    <div className={`cherries-wrapper ${className}`} style={style}>
      <img
        src={decorationAssets.cherries}
        alt={alt}
        className="cherries-img"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
})

export const DoodleHeart = memo(function DoodleHeart({
  className = '',
  style,
  size = 28,
}: {
  className?: string
  style?: React.CSSProperties
  size?: number
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`doodle-heart-svg ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <path
        d="M 50 85 C 38 74, 12 55, 12 32 C 12 18, 24 10, 36 10 C 44 10, 48 15, 50 20 C 52 15, 56 10, 64 10 C 76 10, 88 18, 88 32 C 88 55, 62 74, 50 85 Z"
        fill="currentColor"
      />
      <path
        d="M 46 76 C 36 67, 18 50, 18 32 C 18 21, 27 15, 36 15 C 42 15, 46 19, 48 24"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  )
})

/**
 * Calendar Card recreating the exact scrapbook card from ref.jpeg:
 * Has "January", M T W T F S S, date grid,
 * decorated with a red ribbon bow and cherries,
 * with the special anniversary day circled in an animated hand-drawn heart!
 */
export const CalendarCard = memo(function CalendarCard({
  monthName = 'January',
  highlightDay = 11,
  className = '',
}: {
  monthName?: string
  highlightDay?: number
  className?: string
}) {
  // Calendar dates 1..31 (January layout matching ref.jpeg: Jan 1 is on Thursday in ref image)
  // ref.jpeg layout:
  // M  T  W  T  F  S  S
  //          1  2  3  4
  // 5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  const days = [
    '', '', '', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11',
    '12', '13', '14', '15', '16', '17', '18',
    '19', '20', '21', '22', '23', '24', '25',
    '26', '27', '28', '29', '30', '31',
  ]

  return (
    <div className={`scrapbook-calendar-card ${className}`}>
      {/* Decorative Bow top-left */}
      <div className="calendar-corner-bow">
        <SatinBow alt="Mini satin bow on calendar" />
      </div>

      {/* Decorative Cherries top-right */}
      <div className="calendar-corner-cherries">
        <Cherries alt="Cherries on calendar" />
      </div>

      <div className="calendar-month-title">{monthName}</div>
      <div className="calendar-weekdays">
        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
      </div>
      <div className="calendar-grid">
        {days.map((day, idx) => {
          const isHighlighted = day === String(highlightDay)
          return (
            <div
              key={idx}
              className={`calendar-day ${day ? 'has-day' : 'empty'} ${isHighlighted ? 'is-anniversary-day' : ''}`}
            >
              {day && <span>{day}</span>}
              {isHighlighted && (
                <div className="anniversary-heart-circle" aria-label="Our Special Day">
                  <DoodleHeart size={26} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})

/**
 * Falling romantic rose petals floating in the background
 */
export const FallingPetals = memo(function FallingPetals({ count = 15 }: { count?: number }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + (i % 3) * 3}%`,
      delay: `${(i * 1.3) % 12}s`,
      duration: `${11 + (i % 7) * 2}s`,
      size: `${18 + (i % 5) * 6}px`,
      rotation: `${(i * 45) % 360}deg`,
      sway: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 15)}px`,
    }))
  }, [count])

  return (
    <div className="falling-petals-container" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="falling-petal"
          style={
            {
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--petal-size': p.size,
              '--sway-amount': p.sway,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 40 40" className="petal-svg">
            <path
              d="M 20 4 C 10 12, 4 22, 10 32 C 16 38, 24 38, 30 32 C 36 22, 30 12, 20 4 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  )
})
