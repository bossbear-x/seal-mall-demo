import type { Product } from '../types'

export type Coupon = {
  id: string
  title: string
  description: string
  kind: 'fixed' | 'percent' | 'shipping'
  amount: number
  minimum?: number
  categories?: Product['category'][]
}

export const coupons: Coupon[] = [
  { id: 'fixed-500', title: '500円OFF', description: '5,000円以上のお買い物で利用可能', kind: 'fixed', amount: 500, minimum: 5000 },
  { id: 'milk-10', title: '10% OFF', description: '粉ミルク対象', kind: 'percent', amount: 10, categories: ['milk'] },
  { id: 'shipping-free', title: '送料無料', description: '8,000円以上のお買い物で利用可能', kind: 'shipping', amount: 0, minimum: 8000 },
  { id: 'baby-300', title: '300円OFF', description: '哺乳瓶・育児用品対象', kind: 'fixed', amount: 300, categories: ['bottle', 'pump', 'other'] },
  { id: 'welcome-5', title: '5% OFF', description: '新規会員限定', kind: 'percent', amount: 5 },
]

export function calculateCouponDiscount(couponId: string | null, items: Array<{ product: Product; quantity: number }>, subtotal: number, shipping: number) {
  const coupon = coupons.find((item) => item.id === couponId)
  if (!coupon || (coupon.minimum && subtotal < coupon.minimum)) return 0
  if (coupon.kind === 'shipping') return shipping
  const eligibleSubtotal = coupon.categories
    ? items.reduce((sum, item) => coupon.categories?.includes(item.product.category) ? sum + item.product.price * item.quantity : sum, 0)
    : subtotal
  if (!eligibleSubtotal) return 0
  return coupon.kind === 'percent'
    ? Math.floor(eligibleSubtotal * coupon.amount / 100)
    : Math.min(coupon.amount, eligibleSubtotal)
}
