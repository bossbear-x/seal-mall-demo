import minus from '../assets/figma/source/cart-minus.svg'
import plus from '../assets/figma/source/cart-plus.svg'

export function QuantityStepper({ value, onChange, min = 1 }: { value: number; onChange: (next: number) => void; min?: number }) {
  return (
    <div className="quantity-stepper" aria-label="数量">
      <button aria-label="数量を減らす" disabled={value <= min} onClick={() => onChange(value - 1)}><img src={minus} alt="" /></button>
      <span>{value}</span>
      <button aria-label="数量を増やす" onClick={() => onChange(value + 1)}><img src={plus} alt="" /></button>
    </div>
  )
}
