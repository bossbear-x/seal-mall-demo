import { useState, type ReactNode } from 'react'
import type { Address, CartItem, PaymentMethod, Product } from '../types'
import { formatYen } from '../utils/money'
import { Button } from './Button'
import mastercard from '../assets/figma/payment-source/raw-3.png'
import visaSelected from '../assets/figma/payment-source/raw-4.png'
import visaDefault from '../assets/figma/payment-source/raw-5.png'
import radioDefault from '../assets/figma/payment-source/asset-2.svg'
import radioSelected from '../assets/figma/payment-source/asset-3.svg'
import paymentCheck from '../assets/figma/payment-source/asset-4.svg'
import location from '../assets/figma/source/mypage-location.svg'
import expand from '../assets/figma/source/checkout-expand.svg'

type DetailedItem = CartItem & { product: Product }
type PaymentVariant = `${PaymentMethod}-${'selected' | 'default'}`

const paymentVariants: Record<PaymentVariant, { title: string; number: string; logo: string; selected: boolean }> = {
  'credit-selected': { title: 'Credit card', number: '5105 **** **** 0505', logo: mastercard, selected: true },
  'credit-default': { title: 'Credit card', number: '5105 **** **** 0505', logo: mastercard, selected: false },
  'debit-selected': { title: 'Debit card', number: '3566 **** **** 0505', logo: visaSelected, selected: true },
  'debit-default': { title: 'Debit card', number: '3566 **** **** 0505', logo: visaDefault, selected: false },
}

function DisclosureSection({ title, expanded, onToggle, className = '', children }: { title: string; expanded: boolean; onToggle: () => void; className?: string; children: ReactNode }) {
  return (
    <section className={`checkout-block disclosure-section ${className}`}>
      <button className="checkout-block-toggle disclosure-toggle" type="button" onClick={onToggle} aria-expanded={expanded}>
        <h2>{title}</h2>
        <span className={`checkout-expand ${expanded ? 'expanded' : ''}`} aria-hidden="true"><img src={expand} alt="" /></span>
      </button>
      {expanded && <div className="disclosure-content">{children}</div>}
    </section>
  )
}

function PaymentMethodCard({ method, selected, onSelect }: { method: PaymentMethod; selected: boolean; onSelect: () => void }) {
  const variant = paymentVariants[`${method}-${selected ? 'selected' : 'default'}`]
  return (
    <button className={`payment-option payment-option--${method} ${variant.selected ? 'selected' : 'default'}`} onClick={onSelect}>
      <span className="payment-logo"><img src={variant.logo} alt="" /></span>
      <span className="payment-copy"><b>{variant.title}</b><small>{variant.number}</small></span>
      <span className="payment-state">
        <span className="payment-selected-marker"><img className="payment-radio" src={variant.selected ? radioSelected : radioDefault} alt="" />{variant.selected && <img className="payment-state-check" src={paymentCheck} alt="" />}</span>
      </span>
    </button>
  )
}

export function CheckoutScreen({ items, subtotal, shipping, couponDiscount, total, payment, address, onPayment, onPay, onAddress }: {
  items: DetailedItem[]
  subtotal: number
  shipping: number
  couponDiscount: number
  total: number
  payment: PaymentMethod
  address: Address
  onPayment: (payment: PaymentMethod) => void
  onPay: () => void
  onAddress: () => void
}) {
  const [shippingExpanded, setShippingExpanded] = useState(true)
  const [productsExpanded, setProductsExpanded] = useState(false)
  const [amountExpanded, setAmountExpanded] = useState(false)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="checkout-screen page-content">
      <div className="checkout-layout">
        <div className="checkout-main">
          <DisclosureSection title="配送情報" expanded={shippingExpanded} onToggle={() => setShippingExpanded((expanded) => !expanded)} className="address-block">
            <button className="checkout-row checkout-address-button" onClick={onAddress}>
              <img src={location} alt="" />
              <div><strong>{address.name}（{address.phone}）</strong><p>{address.prefecture}{address.street} {address.building}</p></div>
            </button>
          </DisclosureSection>

          <DisclosureSection title="商品概要" expanded={productsExpanded} onToggle={() => setProductsExpanded((expanded) => !expanded)} className="product-summary-block">
            <div className="order-items expanded">{items.map(({ product, quantity }) => <div className="order-item" key={product.id}><img src={product.image} alt="" /><span>{product.name}</span><b>x{quantity}</b></div>)}</div>
          </DisclosureSection>

          <DisclosureSection title="お支払い金額" expanded={amountExpanded} onToggle={() => setAmountExpanded((expanded) => !expanded)} className="amount-block">
            <dl className="expanded"><div><dt>商品合計</dt><dd>{formatYen(subtotal)}</dd></div><div><dt>国際送料</dt><dd>{shipping === 0 ? '無料' : formatYen(shipping)}</dd></div><div><dt>予想関税・消費税</dt><dd>{formatYen(0)}</dd></div><div className="coupon-discount"><dt>クーポン利用</dt><dd>-{formatYen(couponDiscount)}</dd></div><div className="amount-total"><dt>合計金額</dt><dd>{formatYen(total)}</dd></div></dl>
          </DisclosureSection>

          <section className="checkout-block payment-block">
            <h2>お支払い方法</h2>
            {(['credit', 'debit'] as PaymentMethod[]).map((method) => <PaymentMethodCard key={method} method={method} selected={payment === method} onSelect={() => onPayment(method)} />)}
          </section>
        </div>
        <aside className="checkout-summary">
          <div className="checkout-summary-header"><span className="checkout-summary-copy"><span>合計 {itemCount} 点</span><small>{couponDiscount}円お得</small></span><strong>{formatYen(total)} <em>（税込）</em></strong></div>
          <Button block onClick={onPay}>注文を確定する</Button>
        </aside>
      </div>
    </main>
  )
}
