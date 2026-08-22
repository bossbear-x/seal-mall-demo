import { useEffect, useState } from 'react'
import type { OrderSnapshot } from '../types'
import { formatYen } from '../utils/money'
import bubs from '../assets/figma/orders-bubs.png'
import medela from '../assets/figma/orders-medela.png'
import bottle from '../assets/figma/orders-bottle.png'

type OrderAction = { type: 'exchange' | 'details' | 'repurchase'; disabled?: boolean }
type OrderCard = { id: string; date: string; image: string; itemCount: number; total: number; status: string; actions: OrderAction[]; productId?: string; productSummary?: string; payment?: string; address?: string }
const mockOrders: OrderCard[] = [
  { id: 'mock-1', date: '2025/05/30', image: bubs, itemCount: 2, total: 7100, status: '支払い待ち', actions: [{ type: 'exchange', disabled: true }, { type: 'details' }], productId: 'bellamys-step1' },
  { id: 'mock-2', date: '2025/05/30', image: medela, itemCount: 1, total: 28600, status: '発送待ち', actions: [{ type: 'exchange', disabled: true }, { type: 'details' }, { type: 'repurchase' }], productId: 'medela-pump' },
  { id: 'mock-3', date: '2025/02/16', image: bottle, itemCount: 1, total: 5360, status: 'キャンセル済み', actions: [{ type: 'details' }, { type: 'repurchase' }], productId: 'pigeon-bottle' },
  { id: 'mock-4', date: '2025/02/10', image: bubs, itemCount: 1, total: 6980, status: '配送中', actions: [{ type: 'exchange', disabled: true }, { type: 'details' }], productId: 'bellamys-step1' },
  { id: 'mock-5', date: '2025/01/28', image: bottle, itemCount: 1, total: 5360, status: '評価待ち', actions: [{ type: 'details' }, { type: 'repurchase' }], productId: 'pigeon-bottle' },
]

const filters = ['注文履歴', '支払い待ち', '発送待ち', '配送中', '評価待ち']
const actionLabels = { exchange: '交換・返品', details: '注文詳細', repurchase: '再購入' }

export function OrdersScreen({ orders, initialFilter, onRepurchase }: { orders: OrderSnapshot[]; initialFilter: string; onRepurchase: (productId: string) => void }) {
  const [filter, setFilter] = useState(initialFilter)
  useEffect(() => setFilter(initialFilter), [initialFilter])
  const live: OrderCard[] = orders.map((order) => ({ id: order.orderId, date: new Date(order.paidAt).toLocaleDateString('ja-JP'), image: order.items[0]?.product.image, itemCount: order.itemCount, total: order.total, status: '支払い済み', actions: [{ type: 'exchange' }, { type: 'details' }, { type: 'repurchase' }], productId: order.items[0]?.product.id, productSummary: order.items.map((item) => `${item.product.name} ×${item.quantity}`).join('、'), payment: order.paymentMethod === 'credit' ? 'Credit card' : 'Debit card', address: order.address }))
  const displayedOrders = [...live, ...mockOrders].filter((order) => filter === '注文履歴' || order.status === filter)
  return (
    <main className="standalone-screen secondary-screen orders-screen">
      <div className="filter-bar order-filter">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <section className="orders-list">{displayedOrders.map((order) => <article className="order-card" key={order.id}><h2>{order.status}</h2><div><img src={order.image} alt="" /><span><b>注文日：{order.date}</b>{order.productSummary && <small className="order-product-summary">{order.productSummary}</small>}<small>合計：{order.itemCount}点</small>{order.payment && <small>{order.payment}</small>}{order.address && <small className="order-address">{order.address}</small>}<strong>{formatYen(order.total)}</strong></span><span className="order-actions">{order.actions.map((action) => <button key={action.type} className={`order-action--${action.type}`} disabled={action.disabled || (action.type === 'repurchase' && !order.productId)} onClick={() => { if (action.type === 'repurchase' && order.productId) onRepurchase(order.productId) }}>{actionLabels[action.type]}</button>)}</span></div></article>)}</section>
      {!displayedOrders.length && <p className="simple-empty">該当する注文はありません</p>}
    </main>
  )
}
