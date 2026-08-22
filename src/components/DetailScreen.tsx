import { useEffect, useState } from 'react'
import type { Product } from '../types'
import { formatYen } from '../utils/money'
import { Button } from './Button'
import { QuantityStepper } from './QuantityStepper'
import serviceIcon from '../assets/figma/source/detail-service.svg'
import heartIcon from '../assets/figma/source/detail-heart.svg'
import { useHorizontalDrag } from '../hooks/useHorizontalDrag'

export function DetailScreen({ product, onAdd, isFavorite, onFavorite }: { product: Product; onAdd: (product: Product, quantity: number) => void; isFavorite: boolean; onFavorite: () => void }) {
  const [quantity, setQuantity] = useState(1)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const { ref: galleryRef, dragProps } = useHorizontalDrag<HTMLDivElement>()
  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const specs = product.specs ?? {
    原産国: 'オーストラリア',
    賞味期限: '2027年8月',
    内容量: '1個',
    ブランド: product.name.split('（')[0],
  }
  const detailSections = product.detailSections?.length
    ? product.detailSections
    : product.detailImages?.length
      ? []
      : [
          { title: '商品概要', body: `${product.name}を、毎日のお世話に取り入れやすく紹介する商品です。` },
          { title: '特徴', body: 'シンプルで扱いやすく、日常のさまざまな場面で使いやすい構成です。' },
          { title: '使用シーン', body: 'ご家庭でのお世話や、外出前の準備などにお使いいただけます。' },
          { title: '注意事項', body: 'ご使用前に商品パッケージの表示とお手入れ方法をご確認ください。' },
        ]

  useEffect(() => {
    setGalleryIndex(0)
    galleryRef.current?.scrollTo({ left: 0 })
  }, [product.id, galleryRef])

  const goToImage = (index: number) => {
    setGalleryIndex(index)
    const track = galleryRef.current
    if (track) track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' })
  }

  return (
    <main className="detail-screen page-content">
      <div className="detail-layout">
        <section className="gallery-column">
          <div className="detail-image-track horizontal-scroller" ref={galleryRef} {...dragProps} onScroll={(event) => {
            const track = event.currentTarget
            if (track.clientWidth) setGalleryIndex(Math.round(track.scrollLeft / track.clientWidth))
          }}>
            {gallery.map((image, index) => <div className="detail-image" key={image}><img src={image} alt={`${product.name} ${index + 1}`} />{index === 0 && <span className="status-badge">新品</span>}</div>)}
          </div>
          <div className="gallery-dots" style={{ gridTemplateColumns: `repeat(${gallery.length}, 1fr)` }}>{gallery.map((_, index) => <button key={index} className={index === galleryIndex ? 'active' : ''} aria-label={`画像 ${index + 1}`} onClick={() => goToImage(index)} />)}</div>
        </section>

        <section className="detail-info">
          <div className="detail-heading">
            <h1>{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            <div className="detail-price"><strong>{formatYen(product.price)}</strong><span>（税込）</span><small>関税・送料計算は決済画面で</small></div>
          </div>

          <div className="detail-quantity">
            <span>数量</span>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <div className="specifications">
            <h2>商品仕様</h2>
            <dl>{Object.entries(specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
          </div>

          {product.detailImages?.length && <div className="detail-description-images">{product.detailImages.map((image, index) => <img src={image} alt={`${product.name} 商品説明 ${index + 1}`} key={`${image}-${index}`} />)}</div>}
          {detailSections.length > 0 && <div className="detail-text-sections">{detailSections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>}

          <div className="detail-actions desktop-detail-actions">
            <button className="icon-button" aria-label="サポート"><img src={serviceIcon} alt="" /></button>
            <button className={`icon-button ${isFavorite ? 'favorite-active' : ''}`} aria-label="お気に入り" onClick={onFavorite}><img src={heartIcon} alt="" /></button>
            <Button onClick={() => onAdd(product, quantity)} block>カートに入れる</Button>
          </div>
        </section>
      </div>
      <div className="detail-actions mobile-detail-actions">
        <button className="icon-button" aria-label="サポート"><img src={serviceIcon} alt="" /></button>
        <button className={`icon-button ${isFavorite ? 'favorite-active' : ''}`} aria-label="お気に入り" onClick={onFavorite}><img src={heartIcon} alt="" /></button>
        <Button onClick={() => onAdd(product, quantity)} block>カートに入れる</Button>
      </div>
    </main>
  )
}
