import type { Product } from '../types'
import { formatYen } from '../utils/money'

export function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  const isFormulaCan = /(Aptamil|Bellamy|Bubs|a2 Platinum)/i.test(product.name)
  return (
    <button className="product-card" onClick={() => onSelect(product)}>
      <div className={`product-image-wrap ${isFormulaCan ? 'product-image-wrap--can' : ''}`}>
        {product.badge && <span className={`status-badge ${product.badgeTone === 'sale' ? 'status-badge--sale' : ''}`}>{product.badge}</span>}
        <img src={product.image} alt="" />
      </div>
      <div className="product-copy">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong className={product.badgeTone === 'sale' ? 'sale-price' : ''}>{formatYen(product.price)}</strong><small>（税込）</small>
      </div>
    </button>
  )
}
