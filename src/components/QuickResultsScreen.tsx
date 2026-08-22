import { products } from '../data/products'
import type { Product, QuickEntry } from '../types'
import { ProductListItem } from './ProductListItem'
import couponIcon from '../assets/figma/source/quick-coupon.svg'
import { Button } from './Button'
import { coupons } from '../data/coupons'

const resultMap: Record<Exclude<QuickEntry, 'クーポン'>, Product[]> = {
  人気商品: products.filter((product) => product.isPopular),
  タイムセール: products.filter((product) => product.isTimeSale),
  新着: products.filter((product) => product.isNew).sort((a, b) => (b.newArrivalOrder ?? 0) - (a.newArrivalOrder ?? 0)),
  ランキング: products.filter((product) => product.ranking).sort((a, b) => (a.ranking ?? 0) - (b.ranking ?? 0)),
}

export function QuickResultsScreen({ entry, onSelect, appliedCouponId, onApplyCoupon }: { entry: QuickEntry; onSelect: (product: Product) => void; appliedCouponId: string | null; onApplyCoupon: (couponId: string) => void }) {
  if (entry === 'クーポン') return (
    <main className="standalone-screen secondary-screen coupon-screen">
      <section className="coupon-list" aria-label="5枚のクーポンがあります">{coupons.map((coupon) => { const applied = coupon.id === appliedCouponId; return <article className="coupon-card" key={coupon.id}><span className="coupon-source-icon"><img src={couponIcon} alt="" /></span><div><h2>{coupon.title}</h2><p>{coupon.description}</p><small>有効期限：2026/08/31</small></div><Button disabled={applied} onClick={() => onApplyCoupon(coupon.id)}>{applied ? '利用済み' : '利用する'}</Button></article> })}</section>
    </main>
  )
  const result = resultMap[entry]
  return (
    <main className="standalone-screen secondary-screen quick-results-screen">
      <section className="quick-results-list list-product-grid">{result.map((product) => entry === 'ランキング' ? <div className="ranked-product" key={product.id}><span className="ranking-indicator">{product.ranking}</span><ProductListItem product={product} onSelect={onSelect} /></div> : <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</section>
    </main>
  )
}
