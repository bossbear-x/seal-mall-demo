export type Screen =
  | 'home'
  | 'search'
  | 'category'
  | 'campaign'
  | 'detail'
  | 'favorites'
  | 'cart'
  | 'checkout'
  | 'processing'
  | 'success'
  | 'mypage'
  | 'orders'
  | 'addresses'
  | 'address-form'
  | 'quick-results'
  | 'history'

export type QuickEntry = '人気商品' | 'タイムセール' | '新着' | 'ランキング' | 'クーポン'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
  badgeTone?: 'neutral' | 'sale'
  section: 'trend' | 'recommended' | 'category'
  category?: 'milk' | 'diaper' | 'bottle' | 'pump' | 'other'
  age?: 'newborn' | '6-12' | '1plus' | '2plus'
  functions?: Array<'organic' | 'a2' | 'grassFed' | 'dailySupport'>
  isPopular?: boolean
  isTimeSale?: boolean
  isNew?: boolean
  newArrivalOrder?: number
  ranking?: number
  specs?: Record<string, string>
  gallery?: string[]
  detailImages?: string[]
  detailSections?: Array<{ title: string; body: string }>
}

export type CartItem = {
  productId: string
  quantity: number
}

export type PaymentMethod = 'credit' | 'debit'

export type Address = {
  id: string
  name: string
  phone: string
  postalCode: string
  prefecture: string
  street: string
  building: string
  isDefault: boolean
  verified?: boolean
}

export type OrderSnapshot = {
  orderId: string
  items: Array<CartItem & { product: Product }>
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  paymentMethod: PaymentMethod
  address: string
  paidAt: string
}
