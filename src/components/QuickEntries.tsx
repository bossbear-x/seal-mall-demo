import baseGray from '../assets/figma/source/quick-base-gray.svg'
import baseActive from '../assets/figma/source/quick-base-blue.svg'
import popular from '../assets/figma/source/quick-popular.svg'
import timeSale from '../assets/figma/source/quick-time-sale.svg'
import newArrival from '../assets/figma/source/quick-new.svg'
import ranking from '../assets/figma/source/quick-ranking.svg'
import coupon from '../assets/figma/source/quick-coupon.svg'
import type { QuickEntry } from '../types'
import { useHorizontalDrag } from '../hooks/useHorizontalDrag'
import { useState } from 'react'

export function QuickEntries({ onOpen }: { onOpen: (entry: QuickEntry) => void }) {
  const { ref, dragProps } = useHorizontalDrag<HTMLDivElement>()
  const [pressed, setPressed] = useState<QuickEntry | null>(null)
  const items: Array<{ label: QuickEntry; icon: string }> = [
    { label: '人気商品', icon: popular },
    { label: 'タイムセール', icon: timeSale },
    { label: '新着', icon: newArrival },
    { label: 'ランキング', icon: ranking },
    { label: 'クーポン', icon: coupon },
  ]
  return (
    <div className="quick-entries horizontal-scroller" ref={ref} {...dragProps}>
      {items.map((item) => (
        <button key={item.label} className={pressed === item.label ? 'active' : ''} aria-pressed={pressed === item.label} onPointerDown={() => setPressed(item.label)} onPointerCancel={() => setPressed(null)} onPointerLeave={() => setPressed(null)} onPointerUp={() => setPressed(null)} onClick={() => onOpen(item.label)}>
          <span className="quick-icon">
            <img className="quick-icon-base" src={pressed === item.label ? baseActive : baseGray} alt="" />
            <span className={`quick-icon-glyph quick-icon-glyph--${item.label === 'タイムセール' ? 'time-sale' : 'default'}`}><img src={item.icon} alt="" /></span>
          </span>
          {item.label}
        </button>
      ))}
    </div>
  )
}
