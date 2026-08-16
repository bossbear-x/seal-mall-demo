import type { Product } from '../types'
import { formatYen } from '../utils/money'

export function ProductListItem({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  return (
    <button className="product-list-item" onClick={() => onSelect(product)}>
      <span className="list-product-image">{product.badge && <small>{product.badge}</small>}<img src={product.image} alt="" /></span>
      <span className="list-product-copy"><b>{product.name}</b><span>{product.description}</span><strong>{formatYen(product.price)} <small>（税込）</small></strong></span>
    </button>
  )
}
