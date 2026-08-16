import type { CartItem, Product } from '../types'
import { formatYen } from '../utils/money'
import { Button } from './Button'
import { QuantityStepper } from './QuantityStepper'
import selectedCircle from '../assets/figma/source/cart-radio-selected-base.svg'
import selectionCheck from '../assets/figma/source/cart-radio-selected-check.svg'
import trash from '../assets/figma/source/cart-delete.svg'
import cartIcon from '../assets/figma/source/nav-cart.svg'

type DetailedItem = CartItem & { product: Product }

export function CartScreen({ items, total, onQuantity, onRemove, onCheckout, onContinue }: {
  items: DetailedItem[]
  total: number
  onQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onCheckout: () => void
  onContinue: () => void
}) {
  if (!items.length) return (
    <main className="cart-screen page-content empty-cart">
      <img className="empty-cart-icon" src={cartIcon} alt="" />
      <h2>カートに商品がありません</h2>
      <p>ホームから商品を追加してください。</p>
      <Button onClick={onContinue}>買い物を続ける</Button>
    </main>
  )

  return (
    <main className="cart-screen page-content">
      <div className="cart-layout">
        <section className="cart-list">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <span className="selection-hit-area"><span className="selection-mark"><img src={selectedCircle} alt="" /><img src={selectionCheck} alt="" /></span></span>
              <img src={product.image} alt="" />
              <div className="cart-item-copy">
                <div className="cart-item-title"><h2>{product.name}</h2><button aria-label="削除" onClick={() => onRemove(product.id)}><img src={trash} alt="" /></button></div>
                <div className="cart-item-bottom"><strong>{formatYen(product.price)}</strong><QuantityStepper value={quantity} onChange={(next) => onQuantity(product.id, next)} /></div>
              </div>
            </article>
          ))}
        </section>
        <aside className="cart-summary">
          <div className="summary-row"><span className="select-all"><span className="selection-mark"><img src={selectedCircle} alt="" /><img src={selectionCheck} alt="" /></span>すべて選択</span><span><b>{formatYen(total)}</b>（税込）</span></div>
          <Button block onClick={onCheckout}>レジへ進む</Button>
          <button className="text-link" onClick={onContinue}>買い物を続ける</button>
        </aside>
      </div>
    </main>
  )
}
