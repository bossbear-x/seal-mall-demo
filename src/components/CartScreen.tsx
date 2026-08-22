import { useEffect, useMemo, useState } from 'react'
import type { CartItem, Product } from '../types'
import { formatYen } from '../utils/money'
import { Button } from './Button'
import { QuantityStepper } from './QuantityStepper'
import selectedCircle from '../assets/figma/source/cart-radio-selected-base.svg'
import selectionCheck from '../assets/figma/source/cart-radio-selected-check.svg'
import emptyCircle from '../assets/figma/source/cart-radio-empty.svg'
import trash from '../assets/figma/source/cart-delete.svg'
import cartIcon from '../assets/figma/source/nav-cart.svg'

type DetailedItem = CartItem & { product: Product }

export function CartScreen({ items, onQuantity, onRemove, onRestore, onCheckout, onContinue }: {
  items: DetailedItem[]
  onQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onRestore: (productId: string, quantity: number) => void
  onCheckout: (productIds: string[]) => void
  onContinue: () => void
}) {
  const [removedItem, setRemovedItem] = useState<{ product: Product; quantity: number } | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => items.map((item) => item.product.id))
  useEffect(() => {
    setSelectedIds((current) => current.filter((id) => items.some((item) => item.product.id === id)))
  }, [items])
  useEffect(() => {
    if (!removedItem) return
    const timer = window.setTimeout(() => setRemovedItem(null), 3000)
    return () => window.clearTimeout(timer)
  }, [removedItem])
  const allSelected = items.length > 0 && selectedIds.length === items.length
  const selectedTotal = useMemo(() => items.reduce((sum, item) => selectedIds.includes(item.product.id) ? sum + item.product.price * item.quantity : sum, 0), [items, selectedIds])
  const toggleItem = (productId: string) => setSelectedIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])
  const toggleAll = () => setSelectedIds(allSelected ? [] : items.map((item) => item.product.id))
  const removeWithFeedback = (item: { product: Product; quantity: number }) => { setRemovedItem(item); onRemove(item.product.id) }
  const undoRemove = () => {
    if (!removedItem) return
    onRestore(removedItem.product.id, removedItem.quantity)
    setSelectedIds((current) => current.includes(removedItem.product.id) ? current : [...current, removedItem.product.id])
    setRemovedItem(null)
  }
  const deleteFeedback = <div className="cart-delete-feedback" role="status"><span>アイテムをカートから削除しました</span><button type="button" onClick={undoRemove}>元に戻す</button></div>

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
              <button className="selection-hit-area selection-control" type="button" onClick={() => toggleItem(product.id)} aria-label={`${product.name}を選択`} aria-pressed={selectedIds.includes(product.id)}>{selectedIds.includes(product.id) ? <span className="selection-mark"><img src={selectedCircle} alt="" /><img src={selectionCheck} alt="" /></span> : <img className="selection-empty" src={emptyCircle} alt="" />}</button>
              <img src={product.image} alt="" />
              <div className="cart-item-copy">
                <div className="cart-item-title"><h2>{product.name}</h2><button aria-label="削除" onClick={() => removeWithFeedback({ product, quantity })}><span className="cart-trash-icon"><img src={trash} alt="" /></span></button></div>
                <div className="cart-item-bottom"><strong>{formatYen(product.price)}</strong><QuantityStepper value={quantity} onChange={(next) => onQuantity(product.id, next)} /></div>
              </div>
            </article>
          ))}
          {deleteFeedback}
        </section>
        <aside className="cart-summary">
          <div className="summary-row"><button className="select-all selection-control" type="button" onClick={toggleAll} aria-pressed={allSelected}>{allSelected ? <span className="selection-mark"><img src={selectedCircle} alt="" /><img src={selectionCheck} alt="" /></span> : <img className="selection-empty" src={emptyCircle} alt="" />}すべて選択</button><span><b>{formatYen(selectedTotal)}</b>（税込）</span></div>
          <Button block onClick={() => onCheckout(selectedIds)} disabled={!selectedIds.length}>レジへ進む</Button>
          <button className="text-link" onClick={onContinue}>買い物を続ける</button>
        </aside>
      </div>
    </main>
  )
}
