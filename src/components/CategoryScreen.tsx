import { useState } from 'react'
import type { Product } from '../types'
import { products } from '../data/products'
import { ProductListItem } from './ProductListItem'
import { HeaderSearchButton } from './HeaderSearchButton'

type PrimaryCategory = 'milk' | 'diaper' | 'bottle' | 'pump'
type MilkMode = 'all' | 'age' | 'function'

const primaryLabels: Array<[PrimaryCategory, string]> = [['milk', '粉ミルク'], ['diaper', 'おむつ'], ['bottle', '哺乳瓶'], ['pump', '搾乳器']]
const modeLabels: Array<[MilkMode, string]> = [['all', 'すべて'], ['age', '月齢'], ['function', '機能']]
const ageOrder = { newborn: 0, '6-12': 1, '1plus': 2, '2plus': 3 }

export function CategoryScreen({ onSelect, onSearch }: { onSelect: (product: Product) => void; onSearch: () => void }) {
  const [primaryCategory, setPrimaryCategory] = useState<PrimaryCategory>('milk')
  const [milkMode, setMilkMode] = useState<MilkMode>('all')

  const selectPrimary = (next: PrimaryCategory) => {
    setPrimaryCategory(next)
    setMilkMode('all')
  }
  const selectMode = (next: MilkMode) => {
    setMilkMode(next)
  }

  const categoryProducts = products.filter((product) => product.category === primaryCategory)
  const displayedProducts = primaryCategory !== 'milk' || milkMode === 'all'
    ? categoryProducts
    : milkMode === 'age'
      ? [...categoryProducts].sort((a, b) => ageOrder[a.age ?? '2plus'] - ageOrder[b.age ?? '2plus'])
      : [...categoryProducts].sort((a, b) => Number(Boolean(b.functions?.length)) - Number(Boolean(a.functions?.length)))
  return (
    <main className="standalone-screen category-screen">
      <div className="screen-title-row"><h1>カテゴリー</h1><HeaderSearchButton onClick={onSearch} /></div>
      <div className="filter-bar">{primaryLabels.map(([value, label]) => <button key={value} className={primaryCategory === value ? 'active' : ''} onClick={() => selectPrimary(value)}>{label}</button>)}</div>
      {primaryCategory === 'milk' && <>
        <div className="filter-chips">{modeLabels.map(([value, label]) => <button key={value} className={milkMode === value ? 'active' : ''} onClick={() => selectMode(value)} aria-pressed={milkMode === value}>{label}</button>)}</div>
      </>}
      <section className="category-product-scroll"><div className="list-product-grid">{displayedProducts.map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</div>{!displayedProducts.length && <p className="simple-empty">該当する商品はありません</p>}</section>
    </main>
  )
}
