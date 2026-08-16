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

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
  badgeTone?: 'neutral' | 'sale'
  section: 'trend' | 'recommended'
  specs?: Record<string, string>
  gallery?: string[]
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
