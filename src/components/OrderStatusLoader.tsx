import progressDot from '../assets/figma/source/order-progress-dot.svg'

export function OrderStatusLoader({ state }: { state: 'processing' | 'success' }) {
  return <div className={`order-status-loader order-status-loader--${state}`} aria-hidden="true"><span className="order-status-track" /><span className="order-status-progress" /><img src={progressDot} alt="" /></div>
}
