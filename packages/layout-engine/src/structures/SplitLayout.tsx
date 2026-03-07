import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { CSSLength, ResponsiveValue } from "../system/types.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import { normalizeUnit } from "../core/styleResolver.js"

export interface SplitLayoutProps {
  left: any
  right: any
  leftWidth?: CSSLength | ResponsiveValue<CSSLength>
  splitRatio?: string
  viewportWidth?: number
}

/**
 * SplitLayout - layout dua kolom (kiri/kanan)
 */
export function SplitLayout({
  left,
  right,
  leftWidth,
  splitRatio = "50%",
  viewportWidth = 1024
}: SplitLayoutProps) {
  const resolvedWidth = leftWidth 
    ? normalizeUnit(resolveResponsive(leftWidth, viewportWidth) ?? splitRatio)
    : splitRatio

  return Flex({
    gap: 4,
    children: [
      Box({ 
        width: resolvedWidth,
        style: { flexShrink: 0 },
        children: left 
      }),
      Box({
        style: { flex: 1 },
        children: right
      })
    ]
  })
}