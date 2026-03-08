import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { SidebarLayoutContract } from "../system/contracts.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import { normalizeUnit } from "../core/styleResolver.js"
import type { CSSLength, ResponsiveValue } from "../system/types.js"
import { LAYOUT_DEFAULTS } from "../system/constants.js"

export interface ResponsiveSidebarLayoutProps extends Omit<SidebarLayoutContract, "sidebarWidth"> {
  sidebarWidth?: ResponsiveValue<CSSLength>
  viewportWidth?: number
}

export function SidebarLayout({
  sidebar,
  children,
  sidebarWidth = 240,
  viewportWidth = 1024
}: ResponsiveSidebarLayoutProps) {
  // Resolve responsive sidebarWidth based on viewport
  const resolvedWidth = normalizeUnit(resolveResponsive(sidebarWidth, viewportWidth) ?? 240)
  
  return Flex({
    gap: LAYOUT_DEFAULTS.GAP_DEFAULT,
    children: [
      Box({ width: resolvedWidth, children: sidebar }),
      Box({ style: { flex: 1 }, children })
    ]
  })
}
