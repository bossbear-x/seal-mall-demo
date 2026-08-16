import { useState } from 'react'
import type { Product } from '../types'
import { products } from '../data/products'
import aptamil from '../assets/figma/category-aptamil3.png'
import bubs from '../assets/figma/category-bubs.png'
import bellamys from '../assets/figma/category-bellamys.png'
import a2 from '../assets/figma/category-a2.png'
import { ProductListItem } from './ProductListItem'

const sourceProducts = [
  { ...products[0], image: aptamil, badge: '人気' },
  { ...products[1], id: 'bubs-step1', name: 'Bubs Organic（バブズ）グラスフェッド粉ミルク Step1', description: '新生児から・牧草飼育牛ミルク使用 / 800g', price: 6980, image: bubs, badge: '予約中' },
  { ...products[2], image: bellamys },
  { ...products[3], id: 'a2-platinum', name: 'a2 Platinum（a2プラチナム）プレミアム粉ミルク Step2', description: '6〜12ヶ月・A2プロテイン配合 / 900g', price: 6580, image: a2, badge: undefined },
]

const categoryProducts: Record<string, Product[]> = {
  粉ミルク: sourceProducts,
  おむつ: products.filter((product) => product.id === 'huggies-diapers'),
  哺乳瓶: products.filter((product) => product.id === 'pigeon-bottle'),
  ベビー用品: products.filter((product) => ['qv-baby', 'huggies-wipes', 'medela-pump'].includes(product.id)),
}

export function CategoryScreen({ onSelect }: { onSelect: (product: Product) => void }) {
  const [tab, setTab] = useState('粉ミルク')
  return (
    <main className="standalone-screen category-screen">
      <div className="screen-title-row"><h1>カテゴリー</h1><img src={requireSearch()} alt="" /></div>
      <div className="filter-bar">{['粉ミルク', 'おむつ', '哺乳瓶'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
      <div className="filter-chips"><button className="active">すべて</button><button>月齢</button><button>機能</button></div>
      <section className="list-product-grid">{categoryProducts[tab].map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</section>
    </main>
  )
}

function requireSearch() { return new URL('../assets/figma/search.svg', import.meta.url).href }
