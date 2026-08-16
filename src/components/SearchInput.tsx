import searchIcon from '../assets/figma/source/home-search.svg'
import cancelIcon from '../assets/figma/source/home-cancel.svg'

export function SearchInput({ onOpen }: { onOpen?: () => void }) {
  return (
    <label className="search-input" onClick={onOpen}>
      <span className="search-icon"><img src={searchIcon} alt="" /></span>
      <input aria-label="商品検索" placeholder="検索ワード" readOnly={Boolean(onOpen)} />
      <span className="search-clear" aria-hidden="true"><img src={cancelIcon} alt="" /></span>
    </label>
  )
}
