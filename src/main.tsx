import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

const isMobileDemoEntry = window.location.pathname === '/'
const isForcedMobilePreview = new URLSearchParams(window.location.search).get('mobile-demo') === '1'

if (isForcedMobilePreview) document.documentElement.classList.add('force-mobile-layout')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isMobileDemoEntry
      ? <main className="mobile-demo-stage"><div className="phone-demo-frame"><iframe title="Seal Mall Mobile Demo" src="/responsive?mobile-demo=1" /></div></main>
      : <App />}
  </StrictMode>,
)
