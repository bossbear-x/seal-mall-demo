import logo from '../assets/products/web-logo.png'
import bell from '../assets/figma/source/home-notification.svg'
import back from '../assets/figma/source/detail-back.svg'
import share from '../assets/figma/source/detail-share.svg'
import filter from '../assets/figma/source/cart-filter.svg'
import type { Screen } from '../types'
import { SearchInput } from './SearchInput'

type Props = {
  screen: Screen
  cartCount: number
  onNavigate: (screen: Screen) => void
  onBack?: () => void
}

const title: Partial<Record<Screen, string>> = {
  detail: '商品詳細',
  cart: 'カート',
  checkout: '注文確認',
  favorites: 'お気に入り商品',
  orders: 'マイページ',
  addresses: 'お届け先住所',
}

export function Header({ screen, cartCount, onNavigate, onBack }: Props) {
  const isHome = screen === 'home'
  const isTopLevel = ['home', 'search', 'category', 'campaign', 'mypage'].includes(screen)
  const isSuccess = screen === 'success' || screen === 'processing'

  if (isSuccess) return null

  return (
    <>
      <header className={`header ${isTopLevel ? 'header--home' : 'header--inner'}`}>
        <button className="brand" onClick={() => onNavigate('home')} aria-label="ホームへ">
          <img src={logo} alt="Seal Mall" />
          <span>Seal Mall</span>
        </button>

        {isTopLevel ? <div className="desktop-search"><SearchInput onOpen={() => onNavigate('search')} /></div> : screen !== 'cart' && (
          <button className="icon-button mobile-back" onClick={onBack} aria-label="戻る"><img src={back} alt="" /></button>
        )}

        {!isTopLevel && <h1 className="header-title">{title[screen]}</h1>}

        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <button className={isHome ? 'active' : ''} onClick={() => onNavigate('home')}>ホーム</button>
          <button className={screen === 'category' ? 'active' : ''} onClick={() => onNavigate('category')}>カテゴリー</button>
          <button className={screen === 'campaign' ? 'active' : ''} onClick={() => onNavigate('campaign')}>キャンペーン</button>
          <button onClick={() => onNavigate('cart')}>カート{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</button>
          <button className={screen === 'mypage' ? 'active' : ''} onClick={() => onNavigate('mypage')}>マイページ</button>
        </nav>

        {isTopLevel && <button className="icon-button mobile-action" aria-label="通知"><img src={bell} alt="" /></button>}
        {screen === 'detail' && <button className="icon-button mobile-action" aria-label="共有"><img src={share} alt="" /></button>}
        {screen === 'cart' && <button className="icon-button mobile-action" aria-label="絞り込み"><img src={filter} alt="" /></button>}
      </header>
      {isHome && <div className="mobile-search"><SearchInput onOpen={() => onNavigate('search')} /></div>}
    </>
  )
}
