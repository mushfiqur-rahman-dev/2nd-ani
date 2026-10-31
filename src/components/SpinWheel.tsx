import { useState } from 'react'
import { useStory } from '../context/StoryContext'

export function SpinWheel() {
  const { storyData } = useStory()
  const prompts = storyData.spinPrompts
  const wheelInfo = storyData.wheelSection
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const spin = () => {
    if (isSpinning) return
    const index = Math.floor(Math.random() * prompts.length)
    setIsSpinning(true)
    setResult(null)

    // Slices are at (i * 60 + 30) deg.
    // To land slice `index` directly under the top pointer (0 deg):
    // rotate clockwise by (330 - index * 60) + full rotations
    const fullSpins = 360 * 5
    const targetDeg = fullSpins + (330 - index * 60)
    const currentBase = Math.ceil(rotation / 360) * 360
    setRotation(currentBase + targetDeg)

    window.setTimeout(() => {
      setResult(prompts[index])
      setIsSpinning(false)
    }, 2200)
  }

  return (
    <div className="wheel-experience">
      <div className="wheel-copy">
        <span className="interactive-label">{wheelInfo?.label || 'A tiny game for us'}</span>
        <h2>
          {wheelInfo?.gameTitle ? (
            wheelInfo.gameTitle
          ) : (
            <>Spin for a little <em>love.</em></>
          )}
        </h2>
        <p>
          {wheelInfo?.gameDesc ||
            'One playful prompt, picked just for this moment. No wrong answers, only cute ones.'}
        </p>
      </div>

      <div className="wheel-stage">
        <span className="wheel-pointer" aria-hidden="true">♥</span>
        <div
          className={`wheel ${isSpinning ? 'is-spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prompts.map((prompt, index) => {
            // Slices are 60 deg each. Center of each slice is at (index * 60 + 30) deg.
            const sliceAngle = index * 60 + 30
            const isRedSlice = index % 2 === 0
            return (
              <span
                className="wheel-slice"
                key={prompt + index}
                style={{ transform: `rotate(${sliceAngle}deg)` }}
              >
                <span className={`wheel-slice-num ${isRedSlice ? 'num-on-red' : 'num-on-cream'}`}>
                  {index + 1}
                </span>
              </span>
            )
          })}
          <div className="wheel-center">
            us<br />
            <small>♡</small>
          </div>
        </div>
        <button
          className="wheel-spin-button"
          type="button"
          onClick={spin}
          disabled={isSpinning}
        >
          {isSpinning ? 'spinning...' : 'spin'}
        </button>
      </div>

      <div className={`wheel-result ${result ? 'is-visible' : ''}`} aria-live="polite">
        <span>your little prompt</span>
        <strong>{result ?? 'The wheel is waiting for you.'}</strong>
      </div>
    </div>
  )
}
