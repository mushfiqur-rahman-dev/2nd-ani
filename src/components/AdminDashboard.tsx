import { useState, useRef } from 'react'
import { useStory, compressImageFile } from '../context/StoryContext'
import type { MemoryImage, LoveTestQuestion } from '../content'

export function AdminDashboard() {
  const {
    storyData,
    setStoryData,
    saveChanges,
    resetToDefault,
    isAdminOpen,
    setIsAdminOpen,
  } = useStory()

  const [activeTab, setActiveTab] = useState<'photos' | 'text' | 'quiz' | 'wheel' | 'settings'>('photos')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingName, setUploadingName] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const targetUploadCallback = useRef<((dataUrl: string) => void) | null>(null)

  if (!isAdminOpen) return null

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !targetUploadCallback.current) return
    try {
      setUploadingName('Optimizing image...')
      const compressedDataUrl = await compressImageFile(file)
      targetUploadCallback.current(compressedDataUrl)
      setSaveMessage('✓ Photo uploaded! Click "Save Changes" to save permanently.')
      setTimeout(() => setSaveMessage(null), 4000)
    } catch (err) {
      alert('Error uploading image: ' + String(err))
    } finally {
      setUploadingName(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const triggerUpload = (callback: (dataUrl: string) => void) => {
    targetUploadCallback.current = callback
    fileInputRef.current?.click()
  }

  const handleSave = async () => {
    setIsSaving(true)
    const result = await saveChanges()
    setIsSaving(false)
    setSaveMessage(result.message)
    setTimeout(() => setSaveMessage(null), 4500)
  }

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(storyData, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'anniversary_story_backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string)
        setStoryData((prev) => ({ ...prev, ...parsed }))
        alert('Data imported successfully! Click Save Changes to apply.')
      } catch {
        alert('Invalid JSON file format.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="admin-overlay" role="dialog" aria-modal="true" aria-label="Admin Editor">
      {/* Hidden File Input for All Photo Uploaders */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div className="admin-modal">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header-title">
            <span className="admin-badge">Admin Mode</span>
            <h2>Story Content & Photos Editor</h2>
          </div>
          <div className="admin-header-actions">
            <button
              type="button"
              className="admin-btn admin-btn-save"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : '💾 Save Changes'}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-close"
              onClick={() => {
                setIsAdminOpen(false)
                if (window.location.hash === '#admin') {
                  window.history.pushState(null, '', window.location.pathname)
                }
              }}
              title="Close editor and preview website"
            >
              👁️ View Website ✕
            </button>
          </div>
        </header>

        {/* Toast Notification Banner */}
        {saveMessage && (
          <div className="admin-toast-banner" role="status">
            {saveMessage}
          </div>
        )}

        {/* Loading indicator during image compression */}
        {uploadingName && (
          <div className="admin-uploading-banner">
            ⏳ {uploadingName}
          </div>
        )}

        {/* Navigation Tabs */}
        <nav className="admin-tabs">
          <button
            type="button"
            className={`admin-tab ${activeTab === 'photos' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            📸 Photos & Images
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'text' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            ✍️ Texts & Love Story
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'quiz' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            💖 Love Test (Quiz)
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'wheel' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('wheel')}
          >
            🎡 Spin Wheel
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'settings' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            🔒 PIN & Settings
          </button>
        </nav>

        {/* Tab Body */}
        <div className="admin-body">
          {/* =========================================================================
              TAB 1: PHOTOS & IMAGES (EVERY SINGLE PHOTO ON THE WEBSITE)
              ========================================================================= */}
          {activeTab === 'photos' && (
            <div className="admin-section-grid">
              {/* 1. Hero Photostrip (3 Opening Photos) */}
              <div className="admin-card">
                <div className="admin-section-tag">Hero Section</div>
                <h3>🎞️ Opening Photostrip (3 Photos on Lined Paper)</h3>
                <p className="admin-card-desc">
                  These 3 vertical photos appear framed in the wine-red photostrip on the vintage note sheet in the opening hero section.
                </p>
                <div className="admin-photostrip-row">
                  {storyData.photostrip.map((stripImg, idx) => (
                    <div key={idx} className="admin-photo-tile">
                      <div className="admin-img-preview">
                        <img src={stripImg.src} alt={`Slot ${idx + 1}`} />
                      </div>
                      <span className="admin-tile-label">Slot 0{idx + 1}</span>
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm"
                        onClick={() =>
                          triggerUpload((dataUrl) => {
                            const newStrip = [...storyData.photostrip] as [
                              typeof stripImg,
                              typeof stripImg,
                              typeof stripImg,
                            ]
                            newStrip[idx] = { ...newStrip[idx], src: dataUrl }
                            setStoryData((prev) => ({ ...prev, photostrip: newStrip }))
                          })
                        }
                      >
                        Upload Photo
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. SECTION 2: THE FIRST MEMORY PHOTO (firstStoryImage) */}
              <div className="admin-card">
                <div className="admin-section-tag">Section 2: The First Page</div>
                <h3>✨ The First Page Photo (Under Hero Section)</h3>
                <p className="admin-card-desc">
                  This is the pinned photo right after scrolling down from the hero section (with "the moment we didn’t know was a beginning").
                </p>
                <div className="admin-photo-tile-single">
                  <div className="admin-img-preview">
                    <img src={storyData.firstStoryImage.src} alt="The First Page" />
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn-sm"
                    onClick={() =>
                      triggerUpload((dataUrl) => {
                        setStoryData((prev) => ({
                          ...prev,
                          firstStoryImage: {
                            ...prev.firstStoryImage,
                            src: dataUrl,
                          },
                        }))
                      })
                    }
                  >
                    Upload First Page Photo
                  </button>
                </div>
              </div>

              {/* 3. SECTION 3: STORY JOURNEY PHOTOS (3 CHAPTERS) */}
              <div className="admin-card">
                <div className="admin-section-tag">Section 3: What We Kept</div>
                <h3>📖 Journey Story Photos (Chapters 1, 2, 3)</h3>
                <p className="admin-card-desc">
                  The photos for the three milestones/chapters in the relationship story.
                </p>
                <div className="admin-photostrip-row">
                  {storyData.journey.map((chapter, idx) => (
                    <div key={idx} className="admin-photo-tile">
                      <div className="admin-img-preview">
                        <img src={chapter.image.src} alt={chapter.title} />
                      </div>
                      <span className="admin-tile-label">
                        Chapter 0{idx + 1}: {chapter.date}
                      </span>
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm"
                        onClick={() =>
                          triggerUpload((dataUrl) => {
                            const newJourney = [...storyData.journey]
                            newJourney[idx] = {
                              ...newJourney[idx],
                              image: { ...newJourney[idx].image, src: dataUrl },
                            }
                            setStoryData((prev) => ({ ...prev, journey: newJourney }))
                          })
                        }
                      >
                        Upload Photo
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. SECTION 4: SCATTERED SCRAPBOOK GALLERY PHOTOS */}
              <div className="admin-card admin-card-full">
                <div className="admin-card-header-flex">
                  <div>
                    <div className="admin-section-tag">Section 4: Camera Roll</div>
                    <h3>🖼️ Memory Gallery Photos (Dane-Bame Staggered Layout)</h3>
                    <p className="admin-card-desc">
                      These photos are scattered left and right with pins, bows, and doodle hearts. You can upload photos from your device, edit captions, and add as many new photos as you like!
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn-add"
                    onClick={() => {
                      triggerUpload((dataUrl) => {
                        const newMemory: MemoryImage = {
                          src: dataUrl,
                          alt: 'Our beautiful memory',
                          caption: 'Another unforgettable memory together',
                          width: 1000,
                          height: 1200,
                        }
                        setStoryData((prev) => ({
                          ...prev,
                          memories: [...prev.memories, newMemory],
                        }))
                      })
                    }}
                  >
                    + Add New Photo
                  </button>
                </div>

                <div className="admin-memories-editor-grid">
                  {storyData.memories.map((mem, idx) => (
                    <div key={idx} className="admin-memory-editor-card">
                      <div className="admin-memory-thumb">
                        <img src={mem.src} alt={mem.caption} />
                      </div>
                      <div className="admin-memory-inputs">
                        <label>Caption:</label>
                        <input
                          type="text"
                          value={mem.caption}
                          onChange={(e) => {
                            const updated = [...storyData.memories]
                            updated[idx] = { ...updated[idx], caption: e.target.value }
                            setStoryData((prev) => ({ ...prev, memories: updated }))
                          }}
                        />
                        <div className="admin-memory-btn-row">
                          <button
                            type="button"
                            className="admin-btn admin-btn-sm"
                            onClick={() =>
                              triggerUpload((dataUrl) => {
                                const updated = [...storyData.memories]
                                updated[idx] = { ...updated[idx], src: dataUrl }
                                setStoryData((prev) => ({ ...prev, memories: updated }))
                              })
                            }
                          >
                            Replace Photo
                          </button>
                          <label className="admin-checkbox-label">
                            <input
                              type="checkbox"
                              checked={!!mem.wide}
                              onChange={(e) => {
                                const updated = [...storyData.memories]
                                updated[idx] = { ...updated[idx], wide: e.target.checked }
                                setStoryData((prev) => ({ ...prev, memories: updated }))
                              }}
                            />
                            Wide Card
                          </label>
                          <button
                            type="button"
                            className="admin-btn admin-btn-danger"
                            onClick={() => {
                              if (confirm('Delete this photo from the memory gallery?')) {
                                setStoryData((prev) => ({
                                  ...prev,
                                  memories: prev.memories.filter((_, i) => i !== idx),
                                }))
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. SECTION 8: FINAL SURPRISE PHOTO */}
              <div className="admin-card">
                <div className="admin-section-tag">Section 8: Finale Surprise</div>
                <h3>🎁 Final Surprise Photo (Inside "Open The Last Page")</h3>
                <div className="admin-photo-tile-single">
                  <div className="admin-img-preview">
                    {storyData.surprise.image?.src && (
                      <img src={storyData.surprise.image.src} alt="Surprise" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn-sm"
                    onClick={() =>
                      triggerUpload((dataUrl) => {
                        setStoryData((prev) => ({
                          ...prev,
                          surprise: {
                            ...prev.surprise,
                            image: {
                              src: dataUrl,
                              alt: 'Our forever promise',
                              width: 1000,
                              height: 700,
                            },
                          },
                        }))
                      })
                    }
                  >
                    Upload Surprise Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: TEXTS & LOVE STORY (EVERY SINGLE TEXT ON THE WEBSITE)
              ========================================================================= */}
          {activeTab === 'text' && (
            <div className="admin-section-grid">
              {/* Couple Info & Calendar */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">General Info</div>
                <h3>💑 Couple Names & Calendar Card</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Her Name / Recipient:</label>
                    <input
                      type="text"
                      value={storyData.recipient}
                      onChange={(e) =>
                        setStoryData((prev) => ({ ...prev, recipient: e.target.value }))
                      }
                      placeholder="My Love"
                    />
                  </div>
                  <div className="admin-field">
                    <label>Your Name / Sender:</label>
                    <input
                      type="text"
                      value={storyData.creator}
                      onChange={(e) =>
                        setStoryData((prev) => ({ ...prev, creator: e.target.value }))
                      }
                      placeholder="Your Favorite Person"
                    />
                  </div>
                  <div className="admin-field">
                    <label>Anniversary Tagline:</label>
                    <input
                      type="text"
                      value={storyData.anniversaryDate}
                      onChange={(e) =>
                        setStoryData((prev) => ({ ...prev, anniversaryDate: e.target.value }))
                      }
                      placeholder="Two beautiful years"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Calendar Month Name:</label>
                    <input
                      type="text"
                      value={storyData.calendar?.month || 'January'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          calendar: {
                            ...(prev.calendar || { day: 11 }),
                            month: e.target.value,
                          },
                        }))
                      }
                      placeholder="January"
                    />
                  </div>
                  <div className="admin-field">
                    <label>Anniversary Day (Circled in Red Heart):</label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={storyData.calendar?.day ?? 11}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          calendar: {
                            ...(prev.calendar || { month: 'January' }),
                            day: parseInt(e.target.value, 10) || 1,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Opening Hero Section Texts */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Hero Section Texts</div>
                <h3>✨ Opening Hero Calligraphy & Notes</h3>
                <div className="admin-field">
                  <label>Title (Gold Script):</label>
                  <input
                    type="text"
                    value={storyData.heroTitle}
                    onChange={(e) =>
                      setStoryData((prev) => ({ ...prev, heroTitle: e.target.value }))
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>Romantic Bottom Quote (Gold Calligraphy):</label>
                  <textarea
                    rows={2}
                    value={storyData.heroQuote}
                    onChange={(e) =>
                      setStoryData((prev) => ({ ...prev, heroQuote: e.target.value }))
                    }
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Lined Paper Note 1 (Left):</label>
                    <input
                      type="text"
                      value={storyData.heroTexts?.note1 || 'Those sweet moments...'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          heroTexts: {
                            ...(prev.heroTexts || { note2: '', ctaText: '' }),
                            note1: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Lined Paper Note 2 (Right):</label>
                    <input
                      type="text"
                      value={storyData.heroTexts?.note2 || 'I was thinking of us'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          heroTexts: {
                            ...(prev.heroTexts || { note1: '', ctaText: '' }),
                            note2: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>CTA Button Text:</label>
                    <input
                      type="text"
                      value={storyData.heroTexts?.ctaText || 'Enter our story'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          heroTexts: {
                            ...(prev.heroTexts || { note1: '', note2: '' }),
                            ctaText: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: The First Page */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 2</div>
                <h3>✨ The First Page Texts</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Section Label:</label>
                    <input
                      type="text"
                      value={storyData.firstMemory?.label || 'The First Page'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          firstMemory: {
                            ...(prev.firstMemory || {
                              title: '',
                              titleItalic: '',
                              body: '',
                              handwrittenLine: '',
                              cardNote: '',
                            }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 1:</label>
                    <input
                      type="text"
                      value={storyData.firstMemory?.title || 'It started quietly.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          firstMemory: {
                            ...(prev.firstMemory || {
                              label: '',
                              titleItalic: '',
                              body: '',
                              handwrittenLine: '',
                              cardNote: '',
                            }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.firstMemory?.titleItalic || 'Then it became everything.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          firstMemory: {
                            ...(prev.firstMemory || {
                              label: '',
                              title: '',
                              body: '',
                              handwrittenLine: '',
                              cardNote: '',
                            }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label>Story Body:</label>
                  <textarea
                    rows={3}
                    value={storyData.firstMemory?.body || storyData.journey[0]?.body || ''}
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        firstMemory: {
                          ...(prev.firstMemory || {
                            label: '',
                            title: '',
                            titleItalic: '',
                            handwrittenLine: '',
                            cardNote: '',
                          }),
                          body: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Handwritten Love Line:</label>
                    <input
                      type="text"
                      value={
                        storyData.firstMemory?.handwrittenLine ||
                        'I would choose you again in every lifetime.'
                      }
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          firstMemory: {
                            ...(prev.firstMemory || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              body: '',
                              cardNote: '',
                            }),
                            handwrittenLine: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Card Note (Under Photo):</label>
                    <input
                      type="text"
                      value={
                        storyData.firstMemory?.cardNote ||
                        'the moment we didn’t know was a beginning'
                      }
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          firstMemory: {
                            ...(prev.firstMemory || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              body: '',
                              handwrittenLine: '',
                            }),
                            cardNote: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Journey Chapters */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 3</div>
                <h3>📖 Journey Chapters (Three Little Chapters)</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Section Label:</label>
                    <input
                      type="text"
                      value={storyData.chaptersSection?.label || 'What We Kept'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          chaptersSection: {
                            ...(prev.chaptersSection || { title: '', titleItalic: '' }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Section Title 1:</label>
                    <input
                      type="text"
                      value={storyData.chaptersSection?.title || 'Three little chapters.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          chaptersSection: {
                            ...(prev.chaptersSection || { label: '', titleItalic: '' }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Section Title 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.chaptersSection?.titleItalic || 'One favorite story.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          chaptersSection: {
                            ...(prev.chaptersSection || { label: '', title: '' }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                {storyData.journey.map((chapter, idx) => (
                  <div key={idx} className="admin-sub-card">
                    <h4>Chapter 0{idx + 1}</h4>
                    <div className="admin-form-row">
                      <div className="admin-field">
                        <label>Date Tag:</label>
                        <input
                          type="text"
                          value={chapter.date}
                          onChange={(e) => {
                            const updated = [...storyData.journey]
                            updated[idx] = { ...updated[idx], date: e.target.value }
                            setStoryData((prev) => ({ ...prev, journey: updated }))
                          }}
                        />
                      </div>
                      <div className="admin-field">
                        <label>Chapter Title:</label>
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => {
                            const updated = [...storyData.journey]
                            updated[idx] = { ...updated[idx], title: e.target.value }
                            setStoryData((prev) => ({ ...prev, journey: updated }))
                          }}
                        />
                      </div>
                    </div>
                    <div className="admin-field">
                      <label>Story Text:</label>
                      <textarea
                        rows={3}
                        value={chapter.body}
                        onChange={(e) => {
                          const updated = [...storyData.journey]
                          updated[idx] = { ...updated[idx], body: e.target.value }
                          setStoryData((prev) => ({ ...prev, journey: updated }))
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 4: Memory Gallery Section Texts */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 4</div>
                <h3>🖼️ Memory Gallery Section Texts</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Label:</label>
                    <input
                      type="text"
                      value={storyData.gallerySection?.label || 'From the Camera Roll'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          gallerySection: {
                            ...(prev.gallerySection || {
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              captionTag: '',
                              captionText: '',
                            }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title 1:</label>
                    <input
                      type="text"
                      value={storyData.gallerySection?.title || 'Proof that ordinary'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          gallerySection: {
                            ...(prev.gallerySection || {
                              label: '',
                              titleItalic: '',
                              subtitle: '',
                              captionTag: '',
                              captionText: '',
                            }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.gallerySection?.titleItalic || 'is breathtaking with you.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          gallerySection: {
                            ...(prev.gallerySection || {
                              label: '',
                              title: '',
                              subtitle: '',
                              captionTag: '',
                              captionText: '',
                            }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Subtitle / Instruction:</label>
                  <input
                    type="text"
                    value={
                      storyData.gallerySection?.subtitle ||
                      'Click any photo to open our memory viewer'
                    }
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        gallerySection: {
                          ...(prev.gallerySection || {
                            label: '',
                            title: '',
                            titleItalic: '',
                            captionTag: '',
                            captionText: '',
                          }),
                          subtitle: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Footer Caption Tag:</label>
                    <input
                      type="text"
                      value={storyData.gallerySection?.captionTag || 'save this feeling'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          gallerySection: {
                            ...(prev.gallerySection || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              captionText: '',
                            }),
                            captionTag: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Footer Caption Text:</label>
                    <textarea
                      rows={2}
                      value={
                        storyData.gallerySection?.captionText ||
                        'Some memories are loud. Ours are often soft and tender...'
                      }
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          gallerySection: {
                            ...(prev.gallerySection || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              captionTag: '',
                            }),
                            captionText: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Section 7: Love Letter */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 7</div>
                <h3>💌 The Love Letter</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Section Label:</label>
                    <input
                      type="text"
                      value={storyData.letterSection?.label || 'The Part I Mean Most'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          letterSection: {
                            ...(prev.letterSection || { title: '', titleItalic: '', dateLine: '' }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Section Title:</label>
                    <input
                      type="text"
                      value={storyData.letterSection?.title || 'A letter I could'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          letterSection: {
                            ...(prev.letterSection || { label: '', titleItalic: '', dateLine: '' }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Section Title (Italic):</label>
                    <input
                      type="text"
                      value={storyData.letterSection?.titleItalic || 'never fit in a text.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          letterSection: {
                            ...(prev.letterSection || { label: '', title: '', dateLine: '' }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Top Date Line:</label>
                    <input
                      type="text"
                      value={storyData.letterSection?.dateLine || '01.11.24 → Always'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          letterSection: {
                            ...(prev.letterSection || { label: '', title: '', titleItalic: '' }),
                            dateLine: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                {storyData.letter.paragraphs.map((para, idx) => (
                  <div key={idx} className="admin-field">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label>Paragraph {idx + 1}:</label>
                      {storyData.letter.paragraphs.length > 1 && (
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => {
                            setStoryData((prev) => ({
                              ...prev,
                              letter: {
                                ...prev.letter,
                                paragraphs: prev.letter.paragraphs.filter((_, i) => i !== idx),
                              },
                            }))
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...storyData.letter.paragraphs]
                        updated[idx] = e.target.value
                        setStoryData((prev) => ({
                          ...prev,
                          letter: { ...prev.letter, paragraphs: updated },
                        }))
                      }}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setStoryData((prev) => ({
                      ...prev,
                      letter: {
                        ...prev.letter,
                        paragraphs: [...prev.letter.paragraphs, 'Another sweet thought for you...'],
                      },
                    }))
                  }}
                >
                  + Add New Paragraph
                </button>

                <div className="admin-field" style={{ marginTop: 14 }}>
                  <label>Signature Line:</label>
                  <input
                    type="text"
                    value={storyData.letter.signature}
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        letter: { ...prev.letter, signature: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              {/* Section 8: Final Surprise Texts */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 8</div>
                <h3>🎁 Surprise Reveal Message</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Section Label:</label>
                    <input
                      type="text"
                      value={storyData.finaleSection?.label || 'Before You Leave'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          finaleSection: {
                            ...(prev.finaleSection || { title: '', titleItalic: '', buttonText: '' }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Heading Line 1:</label>
                    <input
                      type="text"
                      value={storyData.finaleSection?.title || 'There is one more'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          finaleSection: {
                            ...(prev.finaleSection || { label: '', titleItalic: '', buttonText: '' }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Heading Line 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.finaleSection?.titleItalic || 'thing to remember.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          finaleSection: {
                            ...(prev.finaleSection || { label: '', title: '', buttonText: '' }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Button Text:</label>
                    <input
                      type="text"
                      value={storyData.finaleSection?.buttonText || 'Open the last page'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          finaleSection: {
                            ...(prev.finaleSection || { label: '', title: '', titleItalic: '' }),
                            buttonText: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label>Message (Gold Script):</label>
                  <textarea
                    rows={2}
                    value={storyData.surprise.message}
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        surprise: { ...prev.surprise, message: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>Final Promise:</label>
                  <input
                    type="text"
                    value={storyData.surprise.promise}
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        surprise: { ...prev.surprise, promise: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              {/* Pin Gate Screen Texts */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Unlock Screen</div>
                <h3>🔒 Unlock Screen Texts (Pin Gate)</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Kicker Tag:</label>
                    <input
                      type="text"
                      value={storyData.pinGateTexts?.kicker || 'A little secret for you'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          pinGateTexts: {
                            ...(prev.pinGateTexts || {
                              title: '',
                              titleItalic: '',
                              instruction: '',
                              footnote: '',
                            }),
                            kicker: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 1:</label>
                    <input
                      type="text"
                      value={storyData.pinGateTexts?.title || 'Our story is'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          pinGateTexts: {
                            ...(prev.pinGateTexts || {
                              kicker: '',
                              titleItalic: '',
                              instruction: '',
                              footnote: '',
                            }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.pinGateTexts?.titleItalic || 'just for us.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          pinGateTexts: {
                            ...(prev.pinGateTexts || {
                              kicker: '',
                              title: '',
                              instruction: '',
                              footnote: '',
                            }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Instruction Text:</label>
                    <input
                      type="text"
                      value={storyData.pinGateTexts?.instruction || 'Enter the date our journey began'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          pinGateTexts: {
                            ...(prev.pinGateTexts || {
                              kicker: '',
                              title: '',
                              titleItalic: '',
                              footnote: '',
                            }),
                            instruction: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Footnote Line:</label>
                    <input
                      type="text"
                      value={
                        storyData.pinGateTexts?.footnote ||
                        'Two years of love, laughs, and a thousand sweet memories.'
                      }
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          pinGateTexts: {
                            ...(prev.pinGateTexts || {
                              kicker: '',
                              title: '',
                              titleItalic: '',
                              instruction: '',
                            }),
                            footnote: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: LOVE TEST (QUIZ)
              ========================================================================= */}
          {activeTab === 'quiz' && (
            <div className="admin-section-grid">
              {/* Section 6 Heading & Result Texts */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 6</div>
                <h3>💖 Love Test Heading & Result Messages</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Label:</label>
                    <input
                      type="text"
                      value={storyData.quizSection?.label || 'A heart-to-heart'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          quizSection: {
                            ...(prev.quizSection || {
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              resultPerfect: '',
                              resultGood: '',
                              resultFooter: '',
                            }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 1:</label>
                    <input
                      type="text"
                      value={storyData.quizSection?.title || 'How well do you know'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          quizSection: {
                            ...(prev.quizSection || {
                              label: '',
                              titleItalic: '',
                              subtitle: '',
                              resultPerfect: '',
                              resultGood: '',
                              resultFooter: '',
                            }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.quizSection?.titleItalic || 'our love?'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          quizSection: {
                            ...(prev.quizSection || {
                              label: '',
                              title: '',
                              subtitle: '',
                              resultPerfect: '',
                              resultGood: '',
                              resultFooter: '',
                            }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Subtitle:</label>
                  <input
                    type="text"
                    value={
                      storyData.quizSection?.subtitle ||
                      'There are no wrong answers here. Just the things I hope you feel when you think of us.'
                    }
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        quizSection: {
                          ...(prev.quizSection || {
                            label: '',
                            title: '',
                            titleItalic: '',
                            resultPerfect: '',
                            resultGood: '',
                            resultFooter: '',
                          }),
                          subtitle: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Perfect Score Message (100%):</label>
                    <input
                      type="text"
                      value={storyData.quizSection?.resultPerfect || 'You know us by heart.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          quizSection: {
                            ...(prev.quizSection || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              resultGood: '',
                              resultFooter: '',
                            }),
                            resultPerfect: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Good Score Message:</label>
                    <input
                      type="text"
                      value={storyData.quizSection?.resultGood || 'You know the sweetest parts.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          quizSection: {
                            ...(prev.quizSection || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              resultPerfect: '',
                              resultFooter: '',
                            }),
                            resultGood: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Result Footnote:</label>
                  <input
                    type="text"
                    value={
                      storyData.quizSection?.resultFooter ||
                      'And honestly, the best answer will always be choosing each other again.'
                    }
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        quizSection: {
                          ...(prev.quizSection || {
                            label: '',
                            title: '',
                            titleItalic: '',
                            subtitle: '',
                            resultPerfect: '',
                            resultGood: '',
                          }),
                          resultFooter: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="admin-card admin-card-full">
                <div className="admin-card-header-flex">
                  <div>
                    <h3>💖 Love Test Questions & Options</h3>
                    <p className="admin-card-desc">
                      Edit the questions, 3 multiple-choice options, and select which option is correct.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn-add"
                    onClick={() => {
                      const newQ: LoveTestQuestion = {
                        prompt: 'What is our favorite thing to do together?',
                        answers: ['Talking late into the night', 'Eating good food', 'Going on long walks'],
                        correct: 0,
                      }
                      setStoryData((prev) => ({
                        ...prev,
                        loveTest: [...prev.loveTest, newQ],
                      }))
                    }}
                  >
                    + Add New Question
                  </button>
                </div>

                {storyData.loveTest.map((q, qIdx) => (
                  <div key={qIdx} className="admin-sub-card">
                    <div className="admin-question-header">
                      <h4>Question 0{qIdx + 1}</h4>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => {
                          if (confirm(`Delete Question 0${qIdx + 1}?`)) {
                            setStoryData((prev) => ({
                              ...prev,
                              loveTest: prev.loveTest.filter((_, i) => i !== qIdx),
                            }))
                          }
                        }}
                      >
                        Delete Question
                      </button>
                    </div>

                    <div className="admin-field">
                      <label>Question Prompt:</label>
                      <input
                        type="text"
                        value={q.prompt}
                        onChange={(e) => {
                          const updated = [...storyData.loveTest]
                          updated[qIdx] = { ...updated[qIdx], prompt: e.target.value }
                          setStoryData((prev) => ({ ...prev, loveTest: updated }))
                        }}
                      />
                    </div>

                    <div className="admin-answers-block">
                      <label>Answers (Click the radio button to select the correct answer):</label>
                      {q.answers.map((ans, aIdx) => (
                        <div key={aIdx} className="admin-answer-row">
                          <input
                            type="radio"
                            name={`correct-ans-${qIdx}`}
                            checked={q.correct === aIdx}
                            onChange={() => {
                              const updated = [...storyData.loveTest]
                              updated[qIdx] = { ...updated[qIdx], correct: aIdx }
                              setStoryData((prev) => ({ ...prev, loveTest: updated }))
                            }}
                            title="Mark as correct answer"
                          />
                          <span className="admin-answer-letter">
                            {String.fromCharCode(65 + aIdx)}
                          </span>
                          <input
                            type="text"
                            value={ans}
                            onChange={(e) => {
                              const updated = [...storyData.loveTest]
                              const newAns = [...updated[qIdx].answers]
                              newAns[aIdx] = e.target.value
                              updated[qIdx] = { ...updated[qIdx], answers: newAns }
                              setStoryData((prev) => ({ ...prev, loveTest: updated }))
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: SPIN WHEEL
              ========================================================================= */}
          {activeTab === 'wheel' && (
            <div className="admin-section-grid">
              {/* Section 5 Heading & Instructions */}
              <div className="admin-card admin-card-full">
                <div className="admin-section-tag">Section 5</div>
                <h3>🎡 Spin Wheel Heading & Instructions</h3>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Section Label:</label>
                    <input
                      type="text"
                      value={storyData.wheelSection?.label || 'A Pause For Us'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          wheelSection: {
                            ...(prev.wheelSection || {
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              gameTitle: '',
                              gameDesc: '',
                            }),
                            label: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 1:</label>
                    <input
                      type="text"
                      value={storyData.wheelSection?.title || 'Pick a little'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          wheelSection: {
                            ...(prev.wheelSection || {
                              label: '',
                              titleItalic: '',
                              subtitle: '',
                              gameTitle: '',
                              gameDesc: '',
                            }),
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Title Line 2 (Italic):</label>
                    <input
                      type="text"
                      value={storyData.wheelSection?.titleItalic || 'something sweet.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          wheelSection: {
                            ...(prev.wheelSection || {
                              label: '',
                              title: '',
                              subtitle: '',
                              gameTitle: '',
                              gameDesc: '',
                            }),
                            titleItalic: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Section Subtitle:</label>
                  <input
                    type="text"
                    value={
                      storyData.wheelSection?.subtitle ||
                      'One playful moment before the most tender part.'
                    }
                    onChange={(e) =>
                      setStoryData((prev) => ({
                        ...prev,
                        wheelSection: {
                          ...(prev.wheelSection || {
                            label: '',
                            title: '',
                            titleItalic: '',
                            gameTitle: '',
                            gameDesc: '',
                          }),
                          subtitle: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Game Header Title:</label>
                    <input
                      type="text"
                      value={storyData.wheelSection?.gameTitle || 'Spin for a little love.'}
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          wheelSection: {
                            ...(prev.wheelSection || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              gameDesc: '',
                            }),
                            gameTitle: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Game Header Description:</label>
                    <input
                      type="text"
                      value={
                        storyData.wheelSection?.gameDesc ||
                        'One playful prompt, picked just for this moment. No wrong answers, only cute ones.'
                      }
                      onChange={(e) =>
                        setStoryData((prev) => ({
                          ...prev,
                          wheelSection: {
                            ...(prev.wheelSection || {
                              label: '',
                              title: '',
                              titleItalic: '',
                              subtitle: '',
                              gameTitle: '',
                            }),
                            gameDesc: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="admin-card admin-card-full">
                <h3>🎡 Spin Wheel Prompts (6 Cute Promises & Dares)</h3>
                <p className="admin-card-desc">
                  Edit the 6 prompts that the wheel lands on when she spins it!
                </p>

                <div className="admin-prompts-grid">
                  {storyData.spinPrompts.map((prompt, idx) => (
                    <div key={idx} className="admin-field">
                      <label>Slot 0{idx + 1}:</label>
                      <input
                        type="text"
                        value={prompt}
                        onChange={(e) => {
                          const updated = [...storyData.spinPrompts]
                          updated[idx] = e.target.value
                          setStoryData((prev) => ({ ...prev, spinPrompts: updated }))
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 5: PIN & SETTINGS
              ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="admin-section-grid">
              <div className="admin-card">
                <h3>🔒 Relationship Start Date (Unlock PIN)</h3>
                <p className="admin-card-desc">
                  This 8-digit date is required to unlock the storybook (format: DDMMYYYY).
                </p>
                <div className="admin-field">
                  <label>Current PIN (DDMMYYYY):</label>
                  <input
                    type="text"
                    maxLength={8}
                    value={storyData.pin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 8)
                      setStoryData((prev) => ({ ...prev, pin: val }))
                    }}
                    placeholder="01112024"
                  />
                  <small style={{ color: '#aaa', marginTop: 4, display: 'block' }}>
                    Example: 01112024 for 01/11/2024
                  </small>
                </div>
              </div>

              <div className="admin-card">
                <h3>💾 Backup & Restore</h3>
                <p className="admin-card-desc">
                  Download a JSON backup of all your photos and texts, or restore from a previous backup.
                </p>
                <div className="admin-btn-row-wrap">
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={handleExportJson}
                  >
                    📥 Download JSON Backup
                  </button>
                  <label className="admin-btn admin-btn-secondary">
                    📤 Restore from JSON
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="admin-card admin-card-danger">
                <h3>⚠️ Reset to Default Template</h3>
                <p className="admin-card-desc">
                  Clears all custom uploads and reverts back to the original template.
                </p>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all content back to original defaults?')) {
                      resetToDefault()
                      alert('Reset complete!')
                    }
                  }}
                >
                  Reset Everything to Defaults
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="admin-modal-footer">
          <span className="admin-footer-hint">
            💡 Tip: Changes are live immediately. Click <strong>Save Changes</strong> to store permanently.
          </span>
          <div className="admin-footer-btn-group">
            <button
              type="button"
              className="admin-btn admin-btn-save"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : '💾 Save Changes'}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-close"
              onClick={() => {
                setIsAdminOpen(false)
                if (window.location.hash === '#admin') {
                  window.history.pushState(null, '', window.location.pathname)
                }
              }}
            >
              Close & View Website
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
