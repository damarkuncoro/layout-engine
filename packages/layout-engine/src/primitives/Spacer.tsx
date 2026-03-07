import { normalizeUnit } from "../core/styleResolver.js"
import type { CSSLength } from "../system/types.js"

export interface SpacerProps {
  size: CSSLength
}

/**
 * Spacer - memberikan jarak kosong yang bisa di-resize
 * Berguna untuk spacing yang dynamic antar komponen
 */
export function Spacer({ size = 4 }: SpacerProps) {
  return {
    type: "div",
    props: {
      style: {
        width: normalizeUnit(size),
        height: normalizeUnit(size),
        flexShrink: 0,
        flexGrow: 0
      }
    }
  }
}