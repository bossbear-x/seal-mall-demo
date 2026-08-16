import type { Address, CartItem, PaymentMethod, Product } from '../types'
import { formatYen } from '../utils/money'
import { Button } from './Button'
import mastercard from '../assets/figma/payment-mastercard.png'
import visa from '../assets/figma/payment-visa.png'
import radio from '../assets/figma/payment-radio.svg'
import paymentCheck from '../assets/figma/payment-check.svg'
import location from '../assets/figma/icon-location.svg'
import expand from '../assets/figma/verified/checkout-expand.svg'

type DetailedItem = CartItem & { product: Product }

const paymentCopy = {
  credit: { title: 'Credit card', logo: mastercard, number: '5105 **** **** 0505' },
  debit: { title: 'Debit card', logo: visa, number: '3566 **** **** 0505' },
}

export function CheckoutScreen({ items, subtotal, shipping, total, payment, address, onPayment, onPay, onAddress }: {
  items: DetailedItem[]
  subtotal: number
  shipping: number
  total: number
  payment: PaymentMethod
  address: Address
  onPayment: (payment: PaymentMethod) => void
  onPay: () => void
  onAddress: () => void
}) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <main className="checkout-screen page-content">
      <div className="checkout-layout">
        <div className="checkout-main">
          <section className="checkout-block address-block">
            <h2>配送情報</h2>
            <button className="checkout-row checkout-address-button" onClick={onAddress}>
              <img src={location} alt="" />
              <div><strong>{address.name}（{address.phone}）</strong><p>{address.prefecture}{address.street} {address.building}</p></div>
              <img src={expand} alt="" />
            </button>
          </section>
          <section className="checkout-block">
            <h2>商品概要</h2>
            <div className="order-items">
              {items.map(({ product, quantity }) => <div className="order-item" key={product.id}><img src={product.image} alt="" /><span>{product.name}</span><b>x{quantity}</b></div>)}
              <span className="checkout-expand" aria-hidden="true"><img src={expand} alt="" /></span>
            </div>
          </section>
          <section className="checkout-block amount-block">
            <h2>お支払い金額</h2><span className="checkout-expand" aria-hidden="true"><img src={expand} alt="" /></span>
            <dl><div><dt>商品小計</dt><dd>{formatYen(subtotal)}</dd></div><div><dt>配送費</dt><dd>{shipping === 0 ? '無料' : formatYen(shipping)}</dd></div></dl>
          </section>
          <section className="checkout-block payment-block">
            <h2>お支払い方法</h2>
            {(Object.keys(paymentCopy) as PaymentMethod[]).map((method) => {
              const data = paymentCopy[method]
              const selected = payment === method
              return (
                <button key={method} className={`payment-option ${selected ? 'selected' : ''}`} onClick={() => onPayment(method)}>
                  <span className="payment-logo"><img src={data.logo} alt="" /></span>
                  <span className="payment-copy"><b>{data.title}</b><small>{data.number}</small></span>
                  <span className="payment-state">{!selected && <img src={radio} alt="" />}{selected && <img className="payment-state-check" src={paymentCheck} alt="" />}</span>
                </button>
              )
            })}
          </section>
        </div>
        <aside className="checkout-summary">
          <div><span>合計 {itemCount} 点</span><small>230円お得</small><strong>{formatYen(total)} <em>（税込）</em></strong></div>
          <Button block onClick={onPay}>注文を確定する</Button>
        </aside>
      </div>
    </main>
  )
}
