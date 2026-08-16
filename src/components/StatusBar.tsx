import cellular from '../assets/figma/source/status-cellular.svg'
import wifi from '../assets/figma/source/status-wifi.svg'
import battery from '../assets/figma/source/status-battery.svg'

export function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <strong>9:41</strong>
      <span><img src={cellular} alt="" /><img src={wifi} alt="" /><img src={battery} alt="" /></span>
    </div>
  )
}
