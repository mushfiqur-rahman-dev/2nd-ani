import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StoryProvider } from './context/StoryContext'
import './styles.css'
import './interactive.css'
import './redesign.css'
import './admin.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoryProvider>
      <App />
    </StoryProvider>
  </StrictMode>,
)
