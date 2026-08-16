import baseGray from '../assets/figma/source/quick-base-gray.svg'
import baseActive from '../assets/figma/source/quick-base-blue.svg'
import popular from '../assets/figma/source/quick-popular.svg'
import timeSale from '../assets/figma/source/quick-time-sale.svg'
import newArrival from '../assets/figma/source/quick-new.svg'
import ranking from '../assets/figma/source/quick-ranking.svg'
import coupon from '../assets/figma/source/quick-coupon.svg'

export function QuickEntries() {
  const items = [
    { label: '人気商品', icon: popular },
    { label: 'タイムセール', icon: timeSale, active: true },
    { label: '新着', icon: newArrival },
    { label: 'ランキング', icon: ranking },
    { label: 'クーポン', icon: coupon },
  ]
  return (
    <div className="quick-entries">
      {items.map((item) => (
        <button key={item.label} className={item.active ? 'active' : ''}>
          <span className="quick-icon">
            <img className="quick-icon-base" src={item.active ? baseActive : baseGray} alt="" />
            <img className="quick-icon-glyph" src={item.icon} alt="" />
          </span>
          {item.label}
        </button>
      ))}
    </div>
  )
}
