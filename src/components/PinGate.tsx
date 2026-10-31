import { useState } from 'react'
import { SatinBow, SafetyPin, DoodleHeart } from './Decorations'
import { useStory } from '../context/StoryContext'

export function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const { storyData, setIsAdminOpen } = useStory()
  const [digits, setDigits] = useState('')
  const [hasError, setHasError] = useState(false)

  const formatted = digits.replace(/(\d{2})(\d{2})(\d{0,4})/, (_, day, month, year) =>
    [day, month, year].filter(Boolean).join('/'),
  )

  const submit = () => {
    if (digits === storyData.pin) {
      onUnlock()
      return
    }
    setHasError(true)
    window.setTimeout(() => setHasError(false), 700)
  }

  return (
    <section className="pin-gate" aria-labelledby="pin-title">
      <div className="pin-ambient-sparkles" aria-hidden="true" />
      <div className="pin-glow pin-glow-one" aria-hidden="true" />
      <div className="pin-glow pin-glow-two" aria-hidden="true" />

      {/* Secret Admin Button at Top Right Corner */}
      <button
        type="button"
        className="pin-gate-admin-secret-btn"
        onClick={() => setIsAdminOpen(true)}
        title="Admin Settings"
        aria-label="Open Admin Editor"
      >
        ⚙️
      </button>

      {/* Decorative Satin Bow top */}
      <div className="pin-gate-top-bow">
        <SatinBow alt="Romantic satin bow" />
      </div>

      <div className={`pin-card ${hasError ? 'pin-shake' : ''}`}>
        <div className="pin-card-pin-corner">
          <SafetyPin />
        </div>

        <span className="pin-kicker">
          {storyData.pinGateTexts?.kicker || 'A little secret for you'}
        </span>
        <div className="pin-lock-icon" aria-hidden="true">
          <DoodleHeart size={44} />
        </div>

        <h1 id="pin-title">
          {storyData.pinGateTexts?.title || 'Our story is'}<br />
          <em>{storyData.pinGateTexts?.titleItalic || 'just for us.'}</em>
        </h1>
        <p className="pin-instruction">
          {storyData.pinGateTexts?.instruction || 'Enter the date our journey began'}
        </p>
        
        <label className="pin-label" htmlFor="relationship-pin">
          Relationship start date
        </label>
        <input
          id="relationship-pin"
          className="pin-input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          value={formatted}
          placeholder="DD/MM/YYYY"
          aria-describedby="pin-hint pin-error"
          onChange={(event) => setDigits(event.target.value.replace(/\D/g, '').slice(0, 8))}
          onKeyDown={(event) => {
            if (event.key === 'Enter') submit()
          }}
          autoFocus
        />
        <p id="pin-hint" className="pin-hint">
          (Format: 01/11/2024 — slashes appear automatically)
        </p>

        <button
          className="button button-pin"
          type="button"
          onClick={submit}
          disabled={digits.length !== 8}
        >
          <span>Unlock our story</span> <span className="button-icon">→</span>
        </button>

        <p
          id="pin-error"
          className={`pin-error ${hasError ? 'is-visible' : ''}`}
          role="alert"
        >
          That date is not quite right. Try again with our special date.
        </p>

        <div className="pin-footnote-wrap">
          <span className="pin-footnote">
            {storyData.pinGateTexts?.footnote ||
              'Two years of love, laughs, and a thousand sweet memories.'}
          </span>
        </div>
      </div>
    </section>
  )
}
