import location from '../assets/figma/source/mypage-location.svg'
import arrow from '../assets/figma/source/mypage-arrow.svg'
import coupon from '../assets/figma/source/mypage-coupon.svg'
import heart from '../assets/figma/source/mypage-heart.svg'
import visibility from '../assets/figma/source/mypage-visibility-outer.svg'
import visibilityDot from '../assets/figma/source/mypage-visibility-inner.svg'
import wallet from '../assets/figma/source/mypage-wallet.svg'
import box from '../assets/figma/source/mypage-box.svg'
import shippingBase from '../assets/figma/source/mypage-shipping-1.svg'
import shippingCart from '../assets/figma/source/mypage-shipping-2.svg'
import star from '../assets/figma/source/mypage-star.svg'
import support from '../assets/figma/source/mypage-service.svg'
import info from '../assets/figma/source/mypage-info.svg'
import settings from '../assets/figma/source/mypage-settings.svg'
import type { Screen } from '../types'

function IconPair({ images, className = '' }: { images: string[]; className?: string }) { return <span className={`stacked-icon ${className}`}>{images.map((image, index) => <img key={image} src={image} alt="" style={{ zIndex: index }} />)}</span> }

export function MyPageScreen({ favoritesCount, onNavigate }: { favoritesCount: number; onNavigate: (screen: Screen) => void }) {
  const status = [
    { label: '支払い待ち', icon: [wallet], badge: '1' },
    { label: '発送待ち', icon: [box], badge: 'NEW' },
    { label: '配送中', icon: [shippingBase, shippingCart], badge: '2', iconClass: 'stacked-icon--shipping' },
    { label: '評価待ち', icon: [star], badge: '・' },
  ]
  return (
    <main className="standalone-screen mypage-screen">
      <div className="screen-title-row"><h1>マイページ</h1></div>
      <section className="account-section order-status-section"><h2>ご注文状況</h2><div className="order-status-grid">{status.map((item) => <button key={item.label} onClick={() => onNavigate('orders')}><i className={item.badge === 'NEW' ? 'badge-new' : ''}>{item.badge}</i><IconPair images={item.icon} className={item.iconClass} /><span>{item.label}</span></button>)}</div></section>
      <section className="account-section"><h2>お客様情報</h2>
        <button className="account-list-item" onClick={() => onNavigate('addresses')}><img src={location} alt="" /><span><b>山田 太郎</b><small>東京都新宿区西新宿3丁目7−1新宿パークタワー 20F</small></span><img src={arrow} alt="" /></button>
        <button className="account-list-item"><img src={coupon} alt="" /><span><b>クーポン・ポイント</b><small>5枚のクーポンがあります</small></span><img src={arrow} alt="" /></button>
        <button className="account-list-item" onClick={() => onNavigate('favorites')}><img src={heart} alt="" /><span><b>お気に入り商品</b><small>{favoritesCount}点の商品</small></span><img src={arrow} alt="" /></button>
        <button className="account-list-item"><IconPair images={[visibility, visibilityDot]} /><span><b>閲覧履歴</b></span><img src={arrow} alt="" /></button>
      </section>
      <section className="account-section"><h2>サポート</h2><div className="support-grid"><button><img src={support} alt="" />カスタマーサポート</button><button><img src={info} alt="" />よくある質問</button><button><img src={settings} alt="" />アプリ設定</button></div></section>
    </main>
  )
}
