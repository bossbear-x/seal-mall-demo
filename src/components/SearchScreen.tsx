import { useMemo, useRef, useState } from 'react'
import { products } from '../data/products'
import type { Product } from '../types'
import search from '../assets/figma/search.svg'
import cancel from '../assets/figma/cancel.svg'
import bell from '../assets/figma/home-bell.svg'
import discovery from '../assets/figma/search-discovery.png'
import empty from '../assets/figma/search-empty.png'
import clock from '../assets/figma/icon-history-clock.svg'
import clockHand from '../assets/figma/icon-history-clock-hand.svg'
import historyDelete from '../assets/figma/icon-delete-history.svg'
import { Button } from './Button'
import { ProductListItem } from './ProductListItem'

const popular = ['アプタミル', 'ベラミーズ', 'シッピーカップ', '電動さく乳器', 'QVベビー', 'ハギーズ']

export function SearchScreen({ onSelect, onHome }: { onSelect: (product: Product) => void; onHome: () => void }) {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [history, setHistory] = useState(['ピジョン哺乳びん', 'おむつ'])
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? products.filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(term)) : []
  }, [query])

  const submit = () => {
    if (!query.trim()) return
    setSubmitted(true)
    setHistory((current) => [query.trim(), ...current.filter((item) => item !== query.trim())].slice(0, 4))
  }

  return (
    <main className="standalone-screen search-screen">
      <div className="screen-top"><strong>Seal Mall</strong><img src={bell} alt="" /></div>
      <form className={`search-field ${query ? 'filled' : ''}`} onSubmit={(event) => { event.preventDefault(); submit() }}>
        <img src={search} alt="" />
        <input
          ref={inputRef}
          value={query}
          placeholder="キーワードを入力"
          onChange={(event) => { setQuery(event.target.value); setSubmitted(false) }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return
            event.preventDefault()
            submit()
          }}
        />
        {query && <button type="button" onClick={() => { setQuery(''); setSubmitted(false); inputRef.current?.focus() }}><img src={cancel} alt="" /></button>}
      </form>

      {!query && !submitted && (
        <section className="search-empty-state">
          <img src={discovery} alt="" />
          <h1>何をお探しですか？</h1>
          <p>お好みのキーワードで検索しましょう</p>
          <Button block onClick={onHome}>ホームへ戻る</Button>
        </section>
      )}

      {!submitted && query && (
        <section className="search-suggestions">
          <h2>検索履歴</h2>
          {history.map((item) => <div className="history-row" key={item}><button onClick={() => { setQuery(item); setSubmitted(true) }}><span className="clock-icon"><img src={clock} alt="" /><img src={clockHand} alt="" /></span>{item}</button><button aria-label="履歴を削除" onClick={() => setHistory((current) => current.filter((value) => value !== item))}><img src={historyDelete} alt="" /></button></div>)}
          <h2>人気の検索</h2>
          <div className="tag-list">{popular.map((item) => <button key={item} onClick={() => { setQuery(item); setSubmitted(true) }}>{item}</button>)}</div>
        </section>
      )}

      {submitted && results.length > 0 && <section className="list-product-grid">{results.map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</section>}

      {submitted && results.length === 0 && (
        <section className="search-no-results">
          <img src={empty} alt="" />
          <h1>一致する商品が見つかりませんでした</h1>
          <p>キーワードを変更して、もう一度お試しください。</p>
          <h2>人気の検索</h2>
          <div className="tag-list">{popular.map((item) => <button key={item} onClick={() => { setQuery(item); setSubmitted(true) }}>{item}</button>)}</div>
          <Button block onClick={() => { setQuery('ベビー'); setSubmitted(true) }}>人気のベビー用品を見る</Button>
        </section>
      )}
    </main>
  )
}
