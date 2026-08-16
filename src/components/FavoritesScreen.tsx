import type { Product } from '../types'
import { ProductListItem } from './ProductListItem'

export function FavoritesScreen({ products, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  return (
    <main className="standalone-screen secondary-screen">
      <section className="list-product-grid favorites-list">{products.map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</section>
      {!products.length && <p className="simple-empty">お気に入り商品はありません</p>}
    </main>
  )
}
