import { products } from '../data/products'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'
import { QuickEntries } from './QuickEntries'
import type { QuickEntry } from '../types'
import { useHorizontalDrag } from '../hooks/useHorizontalDrag'

function ProductCarousel({ products: carouselProducts, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  const { ref, dragProps } = useHorizontalDrag<HTMLDivElement>()
  return <div className="product-grid horizontal-scroller" ref={ref} {...dragProps}>{carouselProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}</div>
}

export function HomeScreen({ onSelect, onQuickEntry }: { onSelect: (product: Product) => void; onQuickEntry: (entry: QuickEntry) => void }) {
  const trend = products.filter((product) => product.section === 'trend')
  const recommended = products.filter((product) => product.section === 'recommended')
  return (
    <main className="home-screen page-content">
      <QuickEntries onOpen={onQuickEntry} />
      <section className="product-section">
        <h2>トレンドアイテム</h2>
        <ProductCarousel products={trend} onSelect={onSelect} />
      </section>
      <section className="product-section">
        <h2>おすすめ</h2>
        <ProductCarousel products={recommended} onSelect={onSelect} />
      </section>
      <button className="load-more">さらに読み込む</button>
    </main>
  )
}
