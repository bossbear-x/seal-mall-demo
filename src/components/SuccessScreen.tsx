import type { OrderSnapshot } from '../types'
import { Button } from './Button'
import successIcon from '../assets/figma/success-icon.svg'

export function SuccessScreen({ order, onHome, onOrders }: { order: OrderSnapshot; onHome: () => void; onOrders: () => void }) {
  return (
    <main className="success-screen page-content">
      <img className="success-icon" src={successIcon} alt="" />
      <h1>ご注文ありがとうございました</h1>
      <p className="order-number">注文番号：{order.orderId}</p>
      <p>ご購入ありがとうございます。現在、商品の発送準備を行っております。</p>
      <div className="success-progress" aria-hidden="true" />
      <div className="success-actions">
        <Button variant="secondary" onClick={onHome}>トップへ戻る</Button>
        <Button onClick={onOrders}>注文詳細を見る</Button>
      </div>
    </main>
  )
}
