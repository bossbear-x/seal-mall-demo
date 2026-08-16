import { products } from '../data/products'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'
import { QuickEntries } from './QuickEntries'

export function HomeScreen({ onSelect }: { onSelect: (product: Product) => void }) {
  const trend = products.filter((product) => product.section === 'trend')
  const recommended = products.filter((product) => product.section === 'recommended')
  return (
    <main className="home-screen page-content">
      <QuickEntries />
      <section className="product-section">
        <h2>トレンドアイテム</h2>
        <div className="product-grid">{trend.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}</div>
      </section>
      <section className="product-section">
        <h2>おすすめ</h2>
        <div className="product-grid">{recommended.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}</div>
      </section>
      <button className="load-more">さらに読み込む</button>
    </main>
  )
}
