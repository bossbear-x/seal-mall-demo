import { useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../data/products'
import type { Product } from '../types'
import search from '../assets/figma/source/home-search.svg'
import cancel from '../assets/figma/source/home-cancel.svg'
import bell from '../assets/figma/source/home-notification.svg'
import discovery from '../assets/figma/search-discovery.png'
import empty from '../assets/figma/search-empty.png'
import clock from '../assets/figma/icon-history-clock.svg'
import clockHand from '../assets/figma/icon-history-clock-hand.svg'
import historyDelete from '../assets/figma/source/cart-delete.svg'
import { Button } from './Button'
import { ProductListItem } from './ProductListItem'

const popular = ['アプタミル', 'ベラミーズ', 'シッピーカップ', '電動さく乳器', 'QVベビー', 'ハギーズ']
type DemoStage = 'initial' | 'empty' | 'typing' | 'filled' | 'results'

function SearchKeyboard() {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ]

  return (
    <div className="search-keyboard" aria-hidden="true">
      <div className="keyboard-suggestions"><span>アプタミル</span><span>赤ちゃん</span><span>ミルク</span></div>
      {rows.map((row, index) => <div className={`keyboard-row keyboard-row--${index + 1}`} key={index}>{row.map((key) => <span key={key}>{key}</span>)}</div>)}
      <div className="keyboard-bottom"><span>123</span><span>🌐</span><span className="keyboard-space">空白</span><span className="keyboard-search">検索</span></div>
    </div>
  )
}

export function SearchScreen({ onSelect, onHome }: { onSelect: (product: Product) => void; onHome: () => void }) {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [stage, setStage] = useState<DemoStage>('initial')
  const [history, setHistory] = useState(['ピジョン哺乳びん', 'おむつ'])
  const inputRef = useRef<HTMLInputElement>(null)
  const demoTimers = useRef<number[]>([])
  const demoCancelled = useRef(false)
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? products.filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(term)) : []
  }, [query])

  const submit = () => {
    if (!query.trim()) return
    setSubmitted(true)
    setStage('results')
    setHistory((current) => [query.trim(), ...current.filter((item) => item !== query.trim())].slice(0, 4))
  }

  const cancelAutoDemo = () => {
    demoCancelled.current = true
    demoTimers.current.forEach(window.clearTimeout)
    demoTimers.current = []
  }

  const chooseSearch = (value: string) => {
    cancelAutoDemo()
    setQuery(value)
    setSubmitted(true)
    setStage('results')
  }

  useEffect(() => {
    demoCancelled.current = false
    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => { if (!demoCancelled.current) callback() }, delay)
      demoTimers.current.push(timer)
    }

    schedule(() => {
      setStage('empty')
      inputRef.current?.focus()
    }, 0)
    const characters = Array.from('アプタミル')
    characters.forEach((_, index) => {
      schedule(() => {
        setStage('typing')
        setQuery(characters.slice(0, index + 1).join(''))
      }, 1000 + index * 300)
    })
    schedule(() => setStage('filled'), 2500)
    schedule(() => {
      const demoQuery = 'アプタミル'
      setQuery(demoQuery)
      setHistory((current) => [demoQuery, ...current.filter((item) => item !== demoQuery)].slice(0, 4))
      setSubmitted(true)
      setStage('results')
    }, 3500)

    return cancelAutoDemo
  }, [])

  const showSuggestions = stage === 'empty' || stage === 'typing'

  return (
    <main className={`standalone-screen search-screen search-screen--${stage}`}>
      <div className="screen-top"><strong>Seal Mall</strong><img src={bell} alt="" /></div>
      <form className={`search-field ${query ? 'filled' : ''} ${showSuggestions ? 'focused' : ''}`} onSubmit={(event) => { event.preventDefault(); cancelAutoDemo(); submit() }}>
        <img src={search} alt="" />
        <input
          ref={inputRef}
          value={query}
          placeholder="キーワードを入力"
          onPointerDown={() => {
            cancelAutoDemo()
            setSubmitted(false)
            setStage(query ? 'typing' : 'empty')
          }}
          onChange={(event) => {
            cancelAutoDemo()
            setQuery(event.target.value)
            setSubmitted(false)
            setStage(event.target.value ? 'typing' : 'empty')
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return
            event.preventDefault()
            cancelAutoDemo()
            submit()
          }}
        />
        {query && <button type="button" onClick={() => { cancelAutoDemo(); setQuery(''); setSubmitted(false); setStage('empty'); inputRef.current?.focus() }}><img src={cancel} alt="" /></button>}
      </form>

      {stage === 'initial' && (
        <section className="search-empty-state search-empty-state--initial">
          <img src={discovery} alt="" />
          <h1>何をお探しですか？</h1>
          <p>お好みのキーワードで検索しましょう</p>
          <Button block onClick={onHome}>ホームへ戻る</Button>
        </section>
      )}

      {showSuggestions && (
        <>
          <section className="search-suggestions">
            <h2>検索履歴</h2>
            {history.map((item) => <div className="history-row" key={item}><button onClick={() => chooseSearch(item)}><span className="clock-icon"><img src={clock} alt="" /><img src={clockHand} alt="" /></span>{item}</button><button aria-label="履歴を削除" onClick={() => { cancelAutoDemo(); setHistory((current) => current.filter((value) => value !== item)) }}><img src={historyDelete} alt="" /></button></div>)}
            <h2>人気の検索</h2>
            <div className="tag-list">{popular.map((item) => <button key={item} onClick={() => chooseSearch(item)}>{item}</button>)}</div>
          </section>
          <SearchKeyboard />
        </>
      )}

      {stage === 'filled' && (
        <section className="search-empty-state search-empty-state--filled">
          <img src={discovery} alt="" />
          <h1>何をお探しですか？</h1>
          <p>お好みのキーワードで検索しましょう</p>
          <Button block onClick={() => { cancelAutoDemo(); submit() }}>検索</Button>
        </section>
      )}

      {submitted && results.length > 0 && <section className="search-results"><div className="list-product-grid">{results.map((product) => <ProductListItem key={product.id} product={product} onSelect={onSelect} />)}</div></section>}

      {submitted && results.length === 0 && (
        <section className="search-no-results">
          <img src={empty} alt="" />
          <h1>一致する商品が見つかりませんでした</h1>
          <p>キーワードを変更して、もう一度お試しください。</p>
          <h2>人気の検索</h2>
          <div className="tag-list">{popular.map((item) => <button key={item} onClick={() => chooseSearch(item)}>{item}</button>)}</div>
          <Button block onClick={() => chooseSearch('ベビー')}>人気のベビー用品を見る</Button>
        </section>
      )}
    </main>
  )
}
