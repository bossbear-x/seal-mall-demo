import { useRef } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'

const DRAG_THRESHOLD = 7

export function useHorizontalDrag<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const drag = useRef({ active: false, dragged: false, pointerId: -1, startX: 0, startScrollLeft: 0 })

  const onPointerDown = (event: ReactPointerEvent<T>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: ref.current?.scrollLeft ?? 0,
    }
  }

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId || !ref.current) return
    const distance = event.clientX - drag.current.startX
    if (!drag.current.dragged && Math.abs(distance) < DRAG_THRESHOLD) return
    if (!drag.current.dragged) {
      drag.current.dragged = true
      ref.current.setPointerCapture(event.pointerId)
    }
    event.preventDefault()
    ref.current.scrollLeft = drag.current.startScrollLeft - distance
  }

  const endDrag = (event: ReactPointerEvent<T>) => {
    if (event.pointerId !== drag.current.pointerId) return
    drag.current.active = false
    if (ref.current?.hasPointerCapture(event.pointerId)) ref.current.releasePointerCapture(event.pointerId)
  }

  const onClickCapture = (event: ReactMouseEvent<T>) => {
    if (!drag.current.dragged) return
    event.preventDefault()
    event.stopPropagation()
    drag.current.dragged = false
  }

  return {
    ref,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  }
}
