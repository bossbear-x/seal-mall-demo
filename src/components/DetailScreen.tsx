import { useState } from 'react'
import type { Product } from '../types'
import { formatYen } from '../utils/money'
import { Button } from './Button'
import { QuantityStepper } from './QuantityStepper'
import serviceIcon from '../assets/figma/source/detail-service.svg'
import heartIcon from '../assets/figma/source/detail-heart.svg'

export function DetailScreen({ product, onAdd, isFavorite, onFavorite }: { product: Product; onAdd: (product: Product, quantity: number) => void; isFavorite: boolean; onFavorite: () => void }) {
  const [quantity, setQuantity] = useState(1)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const specs = product.specs ?? {
    原産国: 'オーストラリア',
    賞味期限: '2027年8月',
    内容量: '1個',
    ブランド: product.name.split('（')[0],
  }

  return (
    <main className="detail-screen page-content">
      <div className="detail-layout">
        <section className="gallery-column">
          <div className="detail-image">
            <img src={gallery[galleryIndex]} alt={product.name} />
            <span className="status-badge">新品</span>
          </div>
          <div className="gallery-dots">{gallery.map((_, index) => <button key={index} className={index === galleryIndex ? 'active' : ''} aria-label={`画像 ${index + 1}`} onClick={() => setGalleryIndex(index)} />)}</div>
        </section>

        <section className="detail-info">
          <div className="detail-heading">
            <h1>{product.name}</h1>
            <div className="detail-price"><strong>{formatYen(product.price)}</strong><span>（税込）</span><small>関税・送料計算は決済画面で</small></div>
          </div>

          <div className="detail-quantity">
            <span>数量</span>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <div className="specifications">
            <h2>商品仕様</h2>
            <dl>{Object.entries(specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
          </div>

          <div className="detail-actions desktop-detail-actions">
            <button className="icon-button" aria-label="サポート"><img src={serviceIcon} alt="" /></button>
            <button className={`icon-button ${isFavorite ? 'favorite-active' : ''}`} aria-label="お気に入り" onClick={onFavorite}><img src={heartIcon} alt="" /></button>
            <Button onClick={() => onAdd(product, quantity)} block>カートに入れる</Button>
          </div>
        </section>
      </div>
      <div className="detail-actions mobile-detail-actions">
        <button className="icon-button" aria-label="サポート"><img src={serviceIcon} alt="" /></button>
        <button className={`icon-button ${isFavorite ? 'favorite-active' : ''}`} aria-label="お気に入り" onClick={onFavorite}><img src={heartIcon} alt="" /></button>
        <Button onClick={() => onAdd(product, quantity)} block>カートに入れる</Button>
      </div>
    </main>
  )
}
