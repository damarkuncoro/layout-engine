import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { HeaderLayoutContract } from "../system/contracts.js"
import type { ResponsiveValue, CSSLength } from "../system/types.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import { normalizeUnit } from "../core/styleResolver.js"

export interface HeaderLayoutProps extends HeaderLayoutContract {
  headerHeight?: ResponsiveValue<CSSLength>
  viewportWidth?: number
}

/**
 * HeaderLayout - layout dengan header di atas dan content di bawah
 */
export function HeaderLayout({
  header,
  children,
  headerHeight = 64,
  viewportWidth = 1024
}: HeaderLayoutProps) {
  const resolvedHeaderHeight = normalizeUnit(resolveResponsive(headerHeight, viewportWidth) ?? 64)

  return Flex({
    viewportWidth,
    direction: "column",
    children: [
      Box({ 
        viewportWidth,
        tag: "header",
        height: resolvedHeaderHeight, 
        style: { position: "sticky", top: 0, zIndex: 10 },
        children: header 
      }),
      Box({
        viewportWidth,
        tag: "main",
        style: { flex: 1 },
        children
      })
    ]
  })
}