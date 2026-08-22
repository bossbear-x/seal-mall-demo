import { OrderStatusLoader } from './OrderStatusLoader'

export function ProcessingScreen() {
  return (
    <main className="processing-screen page-content">
      <OrderStatusLoader state="processing" />
      <h1>お支払いを処理しています</h1>
      <p>画面を閉じずにそのままお待ちください。</p>
    </main>
  )
}
