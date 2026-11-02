import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { defaultStoryContent, type FullStoryData } from '../content'
import customStoryContent from '../customContent.json'

const STORAGE_KEY = 'two_years_one_love_custom_data_v1'

const bundledStoryContent: FullStoryData = {
  ...defaultStoryContent,
  ...(customStoryContent as Partial<FullStoryData>),
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

interface StoryContextType {
  storyData: FullStoryData
  updateStoryData: (newData: Partial<FullStoryData>) => void
  setStoryData: React.Dispatch<React.SetStateAction<FullStoryData>>
  saveChanges: () => Promise<{ success: boolean; message: string }>
  resetToDefault: () => void
  isAdminOpen: boolean
  setIsAdminOpen: (open: boolean) => void
}

const StoryContext = createContext<StoryContextType | undefined>(undefined)

export function StoryProvider({ children }: { children: ReactNode }) {
  const [storyData, setStoryData] = useState<FullStoryData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (isRecord(parsed)) {
          return { ...bundledStoryContent, ...parsed }
        }
      }
    } catch {
      // Ignore parse errors and use bundled project content
    }
    return bundledStoryContent
  })

  const [isAdminOpen, setIsAdminOpen] = useState(false)

  // Listen to #admin in URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const updateStoryData = (newData: Partial<FullStoryData>) => {
    setStoryData((prev) => {
      const updated = { ...prev, ...newData }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (err) {
        console.warn('LocalStorage save error:', err)
      }
      return updated
    })
  }

  const saveChanges = async (): Promise<{ success: boolean; message: string }> => {
    try {
      // 1. Save to LocalStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storyData))

      // 2. Try to save directly to backend if dev server is running
      try {
        const res = await fetch('/api/save-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(storyData),
        })
        if (res.ok) {
          return {
            success: true,
            message: 'Changes saved to LocalStorage & Project Files (customContent.json)!',
          }
        }
      } catch {
        // Dev endpoint not available (e.g. production/static build), localStorage is enough
      }

      return {
        success: true,
        message: 'Changes saved to browser LocalStorage successfully!',
      }
    } catch (err) {
      return {
        success: false,
        message: 'Failed to save: ' + String(err),
      }
    }
  }

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY)
    setStoryData(bundledStoryContent)
  }

  return (
    <StoryContext.Provider
      value={{
        storyData,
        updateStoryData,
        setStoryData,
        saveChanges,
        resetToDefault,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </StoryContext.Provider>
  )
}

export function useStory() {
  const context = useContext(StoryContext)
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider')
  }
  return context
}

/**
 * Client-side image compressor utility
 * Compresses any user-uploaded image into an optimized Data URL (max width/height 1200px, 85% quality)
 */
export function compressImageFile(file: File, maxDim = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(event.target?.result as string)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = reject
      img.src = event.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
