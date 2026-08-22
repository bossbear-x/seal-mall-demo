import search from '../assets/figma/source/home-search.svg'

export function HeaderSearchButton({ onClick }: { onClick: () => void }) {
  return <button className="header-search-button" type="button" onClick={onClick} aria-label="商品を検索"><img src={search} alt="" /></button>
}
