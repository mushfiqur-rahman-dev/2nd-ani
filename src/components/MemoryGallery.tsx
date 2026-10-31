import { useEffect, useRef, useState } from 'react'
import type { MemoryImage } from '../content'
import { SafetyPin, SatinBow, DoodleHeart } from './Decorations'

const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 1000%22%3E%3Crect width=%22800%22 height=%221000%22 fill=%22%23380914%22/%3E%3Cpath d=%22M0 760 230 530l170 170 150-190 250 250v240H0z%22 fill=%22%235a1222%22/%3E%3Ctext x=%22400%22 y=%22500%22 fill=%22%23f5dcab%22 font-family=%22serif%22 font-size=%2240%22 text-anchor=%22middle%22%3EOur Memory%3C/text%3E%3C/svg%3E'

interface ScatteredCardConfig {
  side: 'left' | 'right' | 'center'
  rotation: number
  pinType: 'pin' | 'bow' | 'heart' | 'tape'
  offsetY: number
}

// Preset natural scrapbook offsets and angles for dane-bame layout
const CARD_PRESETS: ScatteredCardConfig[] = [
  { side: 'left', rotation: -3.5, pinType: 'pin', offsetY: 0 },
  { side: 'right', rotation: 4.2, pinType: 'bow', offsetY: 20 },
  { side: 'left', rotation: 2.8, pinType: 'heart', offsetY: -10 },
  { side: 'right', rotation: -3.8, pinType: 'pin', offsetY: 30 },
  { side: 'left', rotation: -2.2, pinType: 'tape', offsetY: 10 },
  { side: 'right', rotation: 3.2, pinType: 'bow', offsetY: -20 },
  { side: 'left', rotation: 3.9, pinType: 'heart', offsetY: 25 },
]

export function MemoryGallery({ memories }: { memories: MemoryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Record<number, string>>({})
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const close = () => {
    setSelectedIndex(null)
    window.setTimeout(() => openerRef.current?.focus(), 0)
  }
  const previous = () =>
    setSelectedIndex((index) =>
      index === null ? null : (index - 1 + memories.length) % memories.length,
    )
  const next = () =>
    setSelectedIndex((index) =>
      index === null ? null : (index + 1) % memories.length,
    )

  useEffect(() => {
    if (selectedIndex === null) return undefined
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'Tab') {
        const controls = Array.from(
          document.querySelectorAll<HTMLButtonElement>('.lightbox button'),
        )
        if (controls.length === 0) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.body.classList.add('lightbox-open')
    closeRef.current?.focus()
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedIndex])

  return (
    <div className="scrapbook-gallery-container">
      {/* Scattered Dane-Bame Scrapbook Stream */}
      <div className="scattered-gallery">
        {memories.map((memory, index) => {
          const preset = CARD_PRESETS[index % CARD_PRESETS.length]
          return (
            <div
              key={memory.src + index}
              className={`scattered-item-wrapper item-side-${preset.side}`}
              style={{
                '--tilt': `${preset.rotation}deg`,
                '--offset-y': `${preset.offsetY}px`,
              } as React.CSSProperties}
            >
              <button
                className={`burgundy-scrapbook-frame ${memory.wide ? 'frame-wide' : ''}`}
                type="button"
                onClick={(event) => {
                  openerRef.current = event.currentTarget
                  setSelectedIndex(index)
                }}
                aria-label={`Open memory: ${memory.caption}`}
              >
                {/* Scrapbook corner decoration based on preset */}
                {preset.pinType === 'pin' && (
                  <div className="card-ornament pin-top-left">
                    <SafetyPin />
                  </div>
                )}
                {preset.pinType === 'bow' && (
                  <div className="card-ornament bow-top-right">
                    <SatinBow alt="Mini satin bow on memory" />
                  </div>
                )}
                {preset.pinType === 'heart' && (
                  <div className="card-ornament heart-corner">
                    <DoodleHeart size={32} />
                  </div>
                )}
                {preset.pinType === 'tape' && (
                  <div className="card-ornament washi-tape" aria-hidden="true" />
                )}

                {/* Inner Photo Window with burgundy mat border */}
                <div className="frame-inner-mat">
                  <img
                    src={failedImages[index] ?? memory.src}
                    alt={memory.alt}
                    width={memory.width}
                    height={memory.height}
                    loading="lazy"
                    onError={() =>
                      setFailedImages((images) => ({ ...images, [index]: fallbackImage }))
                    }
                  />
                  <span className="frame-zoom-cue" aria-hidden="true">✦ view</span>
                </div>

                {/* Handwritten Polaroidesque or Lined Note Caption */}
                <div className="frame-caption-strip">
                  <span className="caption-handwritten">{memory.caption}</span>
                  <span className="caption-date-stamp">0{index + 1} / memory</span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Lightbox modal with deep burgundy luxury backdrop */}
      {selectedIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Memory viewer"
          onClick={close}
        >
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button
              ref={closeRef}
              className="lightbox-close"
              type="button"
              onClick={close}
              aria-label="Close memory viewer"
            >
              ✕
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              type="button"
              onClick={previous}
              aria-label="Previous memory"
            >
              ←
            </button>
            <figure className="lightbox-figure">
              <div className="lightbox-image-shell">
                <img
                  src={failedImages[selectedIndex] ?? memories[selectedIndex].src}
                  alt={memories[selectedIndex].alt}
                  width={memories[selectedIndex].width}
                  height={memories[selectedIndex].height}
                  onError={() =>
                    setFailedImages((images) => ({ ...images, [selectedIndex]: fallbackImage }))
                  }
                />
              </div>
              <figcaption>
                <div className="lightbox-caption-text">{memories[selectedIndex].caption}</div>
                <div className="lightbox-caption-sub">
                  Memory {selectedIndex + 1} of {memories.length}
                </div>
              </figcaption>
            </figure>
            <button
              className="lightbox-nav lightbox-next"
              type="button"
              onClick={next}
              aria-label="Next memory"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
