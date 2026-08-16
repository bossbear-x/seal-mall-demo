import type { Screen } from '../types'
import homeActive from '../assets/figma/source/nav-home-active.svg'
import homeInactive from '../assets/figma/source/nav-home.svg'
import category from '../assets/figma/source/nav-category.svg'
import categoryActive from '../assets/figma/source/nav-category-active.svg'
import campaign from '../assets/figma/source/nav-campaign.svg'
import campaignActive from '../assets/figma/source/nav-campaign-active.svg'
import cartActive from '../assets/figma/source/nav-cart-active.svg'
import cartInactive from '../assets/figma/source/nav-cart.svg'
import profile from '../assets/figma/source/nav-profile.svg'
import profileActive from '../assets/figma/source/nav-profile-active.svg'

export function BottomNav({ screen, cartCount, onNavigate }: { screen: Screen; cartCount: number; onNavigate: (screen: Screen) => void }) {
  if (!['home', 'search', 'category', 'campaign', 'cart', 'mypage', 'orders', 'favorites'].includes(screen)) return null
  const items = [
    { label: 'ホーム', icon: ['home', 'search'].includes(screen) ? homeActive : homeInactive, target: 'home' as Screen },
    { label: 'カテゴリー', icon: screen === 'category' ? categoryActive : category, target: 'category' as Screen },
    { label: 'キャンペーン', icon: screen === 'campaign' ? campaignActive : campaign, target: 'campaign' as Screen },
    { label: 'カート', icon: screen === 'cart' ? cartActive : cartInactive, target: 'cart' as Screen },
    { label: 'マイページ', icon: ['mypage', 'orders', 'favorites'].includes(screen) ? profileActive : profile, target: 'mypage' as Screen },
  ]
  return (
    <nav className="bottom-nav" aria-label="モバイルナビゲーション">
      {items.map((item) => {
        const active = item.target === screen
          || (item.target === 'home' && screen === 'search')
          || (item.target === 'mypage' && ['orders', 'favorites'].includes(screen))
        return (
          <button key={item.label} className={active ? 'active' : ''} onClick={() => item.target && onNavigate(item.target)}>
            <span className="nav-icon"><img src={item.icon} alt="" />{item.label === 'カート' && cartCount > 0 && <b>{cartCount}</b>}</span>
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
