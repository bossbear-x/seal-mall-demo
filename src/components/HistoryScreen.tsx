import type { Product } from '../types'
import { ProductListItem } from './ProductListItem'

export function HistoryScreen({ products, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  return (
    <main className="standalone-screen secondary-screen history-screen">
      <section className="list-product-grid">{products.map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</section>
      {!products.length && <p className="simple-empty">閲覧履歴はまだありません</p>}
    </main>
  )
}
