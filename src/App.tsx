import { useEffect, useState, type ReactNode } from 'react'
import { LoveTest } from './components/LoveTest'
import { MemoryGallery } from './components/MemoryGallery'
import { PinGate } from './components/PinGate'
import { SpinWheel } from './components/SpinWheel'
import { AdminDashboard } from './components/AdminDashboard'
import {
  SafetyPin,
  SatinBow,
  LilyFlower,
  RosesBouquet,
  CalendarCard,
  DoodleHeart,
  FallingPetals,
} from './components/Decorations'
import { useReveal } from './hooks/useReveal'
import { useStory } from './context/StoryContext'
import type { StoryImage } from './content'

const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 1000%22%3E%3Crect width=%22800%22 height=%221000%22 fill=%22%23380914%22/%3E%3Cpath d=%22M0 760 230 530l170 170 150-190 250 250v240H0z%22 fill=%22%235a1222%22/%3E%3Ctext x=%22400%22 y=%22500%22 fill=%22%23f5dcab%22 font-family=%22serif%22 font-size=%2240%22 text-anchor=%22middle%22%3EOur Story%3C/text%3E%3C/svg%3E'

function SafeImage({
  image,
  className = '',
}: {
  image: StoryImage
  className?: string
}) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      onError={(e) => {
        ;(e.currentTarget as HTMLImageElement).src = fallbackImage
      }}
    />
  )
}

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const [ref, isVisible] = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} scene-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  )
}

function SceneLabel({ children }: { children: string }) {
  return <span className="scene-label">{children}</span>
}

export default function App() {
  const { storyData, setIsAdminOpen } = useStory()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [surpriseOpen, setSurpriseOpen] = useState(false)

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.scene-reveal'),
    )
    if (!nodes.length) return undefined
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [isUnlocked])

  return (
    <>
      {/* Hidden Admin Dashboard Modal */}
      <AdminDashboard />

      {!isUnlocked ? (
        <PinGate onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <div className="story-app burgundy-scrapbook-theme">
          {/* Background Ambience & Falling Petals */}
          <div className="story-grain" aria-hidden="true" />
          <div className="burgundy-glitter-layer" aria-hidden="true" />
          <FallingPetals count={16} />

          {/* Floating Header */}
          <header className="floating-header">
            <a href="#top" className="wordmark">
              two years<span>♡</span>
            </a>
            <span className="header-date">{storyData.anniversaryDate}</span>
            <div className="header-right-group">
              <a className="header-link" href="#letter">
                love letter <span>→</span>
              </a>
              {/* Secret Admin Button */}
              <button
                type="button"
                className="header-admin-quick-btn"
                onClick={() => setIsAdminOpen(true)}
                title="Open Content & Photo Editor"
                aria-label="Admin Editor"
              >
                ⚙️
              </button>
            </div>
          </header>

          <main id="top">
            {/* =========================================================
                HERO / OPENING SCENE: RECREATING THE REF.JPEG SCRAPBOOK
                ========================================================= */}
            <section className="hero-scrapbook-scene" aria-label="Anniversary Celebration">
              {/* Top Left Big Satin Bow */}
              <div className="hero-top-left-bow">
                <SatinBow alt="Large red satin ribbon bow" />
              </div>

              <div className="hero-scrapbook-canvas">
                {/* LEFT / CENTER: Vintage Lined Paper Sheet with Photostrip & Notes */}
                <div className="hero-lined-paper-sheet">
                  <div className="lined-paper-top-notes" aria-hidden="true">
                    <span>{storyData.heroTexts?.note1 || 'Those sweet moments...'}</span>
                    <span>{storyData.heroTexts?.note2 || 'I was thinking of us'}</span>
                  </div>

                  {/* Burgundy Photostrip Frame (3 Photos from photostrip array) */}
                  <div className="hero-photostrip-frame">
                    {storyData.photostrip.map((stripImg, idx) => (
                      <div key={idx} className="photostrip-slot">
                        <SafeImage image={stripImg} />
                        <span className="photostrip-label">
                          0{idx + 1} / {idx === 0 ? 'together' : idx === 1 ? 'everyday' : 'forever'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Red Doodle Heart Stamps on the Paper */}
                  <div className="sheet-doodle-heart heart-one" aria-hidden="true">
                    <DoodleHeart size={34} />
                  </div>
                  <div className="sheet-doodle-heart heart-two" aria-hidden="true">
                    <DoodleHeart size={28} />
                  </div>

                  {/* Safety Pin pinned through paper to Bouquet */}
                  <div className="hero-sheet-safety-pin" aria-hidden="true">
                    <SafetyPin />
                  </div>

                  {/* Velvet Roses Bouquet pinned at bottom-left */}
                  <div className="hero-roses-bouquet">
                    <RosesBouquet alt="Velvet red roses bouquet pinned with safety pin" />
                  </div>
                </div>

                {/* RIGHT SIDE: Calligraphy, Calendar Card, Animated Lily Flower, & Quote */}
                <div className="hero-scrapbook-right">
                  {/* Top Calligraphy: Happy Anniversary */}
                  <Reveal className="hero-anniversary-title">
                    <h1 className="gold-script-anniversary">{storyData.heroTitle}</h1>
                  </Reveal>

                  {/* Mini Calendar Card with Cherries and Bow */}
                  <Reveal className="hero-calendar-wrap">
                    <CalendarCard
                      monthName={storyData.calendar?.month || 'January'}
                      highlightDay={storyData.calendar?.day ?? 11}
                      className="hero-calendar"
                    />
                  </Reveal>

                  {/* Animated Red Lily Flower */}
                  <div className="hero-animated-lily" aria-hidden="true">
                    <LilyFlower alt="Blooming red lily flower gently swaying" />
                  </div>

                  {/* Romantic Bottom Calligraphy Quote */}
                  <Reveal className="hero-bottom-quote-wrap">
                    <p className="gold-script-quote">{storyData.heroQuote}</p>
                    <div className="hero-scroll-action">
                      <a href="#first-memory" className="scrapbook-cta-button">
                        <span>{storyData.heroTexts?.ctaText || 'Enter our story'}</span>
                        <span className="cta-icon">↓</span>
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* =========================================================
                SECTION 2: THE FIRST MEMORY
                ========================================================= */}
            <section id="first-memory" className="memory-intro scene-burgundy">
              <div className="memory-intro-inner">
                <Reveal>
                  <SceneLabel>{storyData.firstMemory?.label || 'The First Page'}</SceneLabel>
                </Reveal>
                <Reveal className="memory-intro-title">
                  <h2>
                    {storyData.firstMemory?.title || 'It started quietly.'}<br />
                    <i>{storyData.firstMemory?.titleItalic || 'Then it became everything.'}</i>
                  </h2>
                </Reveal>
                <Reveal className="memory-intro-body">
                  <p>{storyData.firstMemory?.body || storyData.journey[0]?.body}</p>
                  <span className="handwritten-line">
                    {storyData.firstMemory?.handwrittenLine ||
                      'I would choose you again in every lifetime.'}
                  </span>
                </Reveal>
                <div className="dark-scroll-mark" aria-hidden="true">
                  <span /> keep scrolling ↓
                </div>
              </div>

              <Reveal className="dark-memory-card-wrap">
                <div className="burgundy-memory-card">
                  <div className="card-pin">
                    <SafetyPin />
                  </div>
                  <SafeImage image={storyData.firstStoryImage} />
                  <div className="memory-card-note">
                    <DoodleHeart size={20} />
                    <span>
                      {storyData.firstMemory?.cardNote ||
                        'the moment we didn’t know was a beginning'}
                    </span>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* =========================================================
                SECTION 3: THREE LITTLE CHAPTERS
                ========================================================= */}
            <section className="chapter-cascade scene-parchment" aria-labelledby="chapters-title">
              <div className="chapter-heading">
                <Reveal>
                  <SceneLabel>{storyData.chaptersSection?.label || 'What We Kept'}</SceneLabel>
                  <h2 id="chapters-title">
                    {storyData.chaptersSection?.title || 'Three little chapters.'}<br />
                    <i>{storyData.chaptersSection?.titleItalic || 'One favorite story.'}</i>
                  </h2>
                </Reveal>
              </div>
              <div className="chapter-stack">
                {storyData.journey.slice(1).map((chapter, index) => (
                  <article
                    className={`cascade-card cascade-${index + 1}`}
                    key={chapter.title + index}
                  >
                    <div className="cascade-image-wrap">
                      {index % 2 === 0 ? (
                        <div className="cascade-ornament pin-corner">
                          <SafetyPin />
                        </div>
                      ) : (
                        <div className="cascade-ornament bow-corner">
                          <SatinBow />
                        </div>
                      )}
                      <div className="cascade-photo-mat">
                        <SafeImage image={chapter.image} />
                        <span className="cascade-number">0{index + 2}</span>
                      </div>
                    </div>
                    <div className="cascade-copy">
                      <span>{chapter.date}</span>
                      <h3>{chapter.title}</h3>
                      <p>{chapter.body}</p>
                      <i>
                        {index === 0
                          ? 'the small everyday magic'
                          : 'still choosing you every single day'}
                      </i>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* =========================================================
                SECTION 4: MEMORY GALLERY (DANE-BAME SCATTERED SCRAPBOOK)
                ========================================================= */}
            <section
              className="scrapbook-gallery-section scene-burgundy"
              aria-labelledby="scrapbook-title"
            >
              <Reveal className="scrapbook-heading">
                <SceneLabel>{storyData.gallerySection?.label || 'From the Camera Roll'}</SceneLabel>
                <h2 id="scrapbook-title">
                  {storyData.gallerySection?.title || 'Proof that ordinary'}<br />
                  <i>{storyData.gallerySection?.titleItalic || 'is breathtaking with you.'}</i>
                </h2>
                <p className="gallery-subtitle">
                  {storyData.gallerySection?.subtitle || 'Click any photo to open our memory viewer'}
                </p>
              </Reveal>

              {/* Staggered Dane-Bame Scattered Memory Cards */}
              <MemoryGallery memories={storyData.memories} />

              <Reveal className="scrapbook-caption">
                <div className="caption-deco-lily">
                  <LilyFlower />
                </div>
                <div className="caption-content">
                  <span>{storyData.gallerySection?.captionTag || 'save this feeling'}</span>
                  <p>
                    {storyData.gallerySection?.captionText ||
                      'Some memories are loud. Ours are often soft and tender, and that is what makes them so precious to me.'}
                  </p>
                </div>
              </Reveal>
            </section>

            {/* =========================================================
                SECTION 5: SPIN THE WHEEL (SWEET MOMENT)
                ========================================================= */}
            <section className="play-scene scene-parchment" aria-labelledby="play-title">
              <Reveal className="play-heading">
                <SceneLabel>{storyData.wheelSection?.label || 'A Pause For Us'}</SceneLabel>
                <h2 id="play-title">
                  {storyData.wheelSection?.title || 'Pick a little'}<br />
                  <i>{storyData.wheelSection?.titleItalic || 'something sweet.'}</i>
                </h2>
                <p>
                  {storyData.wheelSection?.subtitle ||
                    'One playful moment before the most tender part.'}
                </p>
              </Reveal>
              <SpinWheel />
            </section>

            {/* =========================================================
                SECTION 6: LOVE TEST
                ========================================================= */}
            <section className="heart-scene scene-burgundy" aria-labelledby="heart-title">
              <LoveTest />
            </section>

            {/* =========================================================
                SECTION 7: THE LOVE LETTER (LINED VINTAGE PAPER)
                ========================================================= */}
            <section id="letter" className="letter-scene scene-parchment">
              <Reveal className="letter-intro">
                <SceneLabel>{storyData.letterSection?.label || 'The Part I Mean Most'}</SceneLabel>
                <h2>
                  {storyData.letterSection?.title || 'A letter I could'}<br />
                  <i>{storyData.letterSection?.titleItalic || 'never fit in a text.'}</i>
                </h2>
              </Reveal>

              <Reveal className="letter-paper-wrapper">
                <div className="letter-paper-pin">
                  <SafetyPin />
                </div>
                <div className="letter-paper-bow">
                  <SatinBow />
                </div>

                <article className="vintage-letter-paper">
                  <div className="letter-paper-top">
                    <span>Dear {storyData.recipient},</span>
                    <span>{storyData.letterSection?.dateLine || '01.11.24 → Always'}</span>
                  </div>
                  <div className="letter-body">
                    {storyData.letter.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="letter-signature-block">
                    <p className="letter-signature">
                      {storyData.letter.signature}
                      <strong>{storyData.creator}</strong>
                    </p>
                    <div className="letter-wax-seal">
                      <DoodleHeart size={38} />
                    </div>
                  </div>
                </article>
              </Reveal>
            </section>

            {/* =========================================================
                SECTION 8: FINALE SURPRISE
                ========================================================= */}
            <section
              className={`finale-scene ${surpriseOpen ? 'revealed' : ''}`}
              aria-labelledby="finale-title"
            >
              <div className="finale-backdrop" aria-hidden="true">
                <DoodleHeart size={200} className="drift-heart-1" />
                <DoodleHeart size={320} className="drift-heart-2" />
                <DoodleHeart size={160} className="drift-heart-3" />
              </div>

              <Reveal className="finale-content">
                <SceneLabel>{storyData.finaleSection?.label || 'Before You Leave'}</SceneLabel>
                <h2 id="finale-title">
                  {storyData.finaleSection?.title || 'There is one more'}<br />
                  <i>{storyData.finaleSection?.titleItalic || 'thing to remember.'}</i>
                </h2>
                {!surpriseOpen ? (
                  <button
                    className="finale-button"
                    type="button"
                    onClick={() => setSurpriseOpen(true)}
                  >
                    <span>{storyData.finaleSection?.buttonText || 'Open the last page'}</span>
                    <span className="finale-btn-icon">♡</span>
                  </button>
                ) : (
                  <div className="finale-message">
                    <p className="gold-script-promise">{storyData.surprise.message}</p>
                    <strong className="finale-promise-line">
                      {storyData.surprise.promise}
                    </strong>
                    {storyData.surprise.image && (
                      <div className="finale-photo-frame">
                        <div className="finale-photo-bow">
                          <SatinBow />
                        </div>
                        <SafeImage image={storyData.surprise.image} />
                      </div>
                    )}
                  </div>
                )}
              </Reveal>
            </section>
          </main>

          <footer className="story-footer">
            <div className="footer-left">
              <DoodleHeart size={20} />
              <span>made with a full heart</span>
            </div>
            <strong className="gold-script-footer">two years, one love</strong>
            <div className="footer-right">
              <small>{storyData.creator}</small>
              <button
                type="button"
                className="footer-admin-btn"
                onClick={() => setIsAdminOpen(true)}
                title="Open Admin Dashboard"
              >
                ⚙️ Admin
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
