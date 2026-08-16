import search from '../assets/figma/search.svg'
import illustration from '../assets/figma/campaign-empty.png'
import { Button } from './Button'

export function CampaignScreen({ onHome, onSearch }: { onHome: () => void; onSearch: () => void }) {
  return (
    <main className="standalone-screen campaign-screen">
      <div className="screen-title-row"><h1>キャンペーン</h1><button onClick={onSearch}><img src={search} alt="" /></button></div>
      <section className="campaign-empty-state">
        <img src={illustration} alt="" />
        <h2>ただいま準備中です</h2>
        <p>お楽しみのところ恐れ入ります。現在、新しいキャンペーンを準備しております。</p>
        <Button block onClick={onHome}>ホームへ戻る</Button>
      </section>
    </main>
  )
}
