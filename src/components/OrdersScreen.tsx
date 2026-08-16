import type { OrderSnapshot } from '../types'
import { formatYen } from '../utils/money'
import bubs from '../assets/figma/orders-bubs.png'
import medela from '../assets/figma/orders-medela.png'
import bottle from '../assets/figma/orders-bottle.png'

type OrderCard = { id: string; date: string; image: string; itemCount: number; total: number; status: string; action?: string; productSummary?: string; payment?: string; address?: string }
const mockOrders: OrderCard[] = [
  { id: 'mock-1', date: '2025/05/30', image: bubs, itemCount: 2, total: 7100, status: '支払い待ち', action: '注文詳細' },
  { id: 'mock-2', date: '2025/05/30', image: medela, itemCount: 1, total: 28600, status: '発送待ち', action: '再購入' },
  { id: 'mock-3', date: '2025/02/16', image: bottle, itemCount: 1, total: 5360, status: 'キャンセル済み', action: '再購入' },
]

export function OrdersScreen({ orders }: { orders: OrderSnapshot[] }) {
  const live: OrderCard[] = orders.map((order) => ({ id: order.orderId, date: new Date(order.paidAt).toLocaleDateString('ja-JP'), image: order.items[0]?.product.image, itemCount: order.itemCount, total: order.total, status: '支払い済み', action: '注文詳細', productSummary: order.items.map((item) => `${item.product.name} ×${item.quantity}`).join('、'), payment: order.paymentMethod === 'credit' ? 'Credit card' : 'Debit card', address: order.address }))
  return (
    <main className="standalone-screen secondary-screen orders-screen">
      <div className="filter-bar order-filter"><button className="active">注文履歴</button><button>支払い待ち</button><button>発送待ち</button><button>配送中</button></div>
      <section className="orders-list">{[...live, ...mockOrders].map((order) => <article className="order-card" key={order.id}><h2>{order.status}</h2><div><img src={order.image} alt="" /><span><b>注文日：{order.date}</b>{order.productSummary && <small className="order-product-summary">{order.productSummary}</small>}<small>合計：{order.itemCount}点</small>{order.payment && <small>{order.payment}</small>}{order.address && <small className="order-address">{order.address}</small>}<strong>{formatYen(order.total)}</strong></span><span className="order-actions"><button>交換・返品</button><button>{order.action}</button>{order.action === '再購入' && <button className="repurchase">再購入</button>}</span></div></article>)}</section>
    </main>
  )
}
