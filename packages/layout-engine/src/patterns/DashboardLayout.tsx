import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { DashboardLayoutContract } from "../system/contracts.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import { normalizeUnit } from "../core/styleResolver.js"
import type { CSSLength, ResponsiveValue } from "../system/types.js"

export interface DashboardLayoutProps extends DashboardLayoutContract {
  sidebarWidth?: ResponsiveValue<CSSLength>
  headerHeight?: string | number
  height?: string | number
  viewportWidth?: number
  style?: Record<string, any>
}

/**
 * DashboardLayout - Struktur layout admin/dashboard yang menggabungkan Sidebar dan Header
 */
export function DashboardLayout({
  sidebar,
  header,
  children,
  sidebarWidth = 280,
  headerHeight = 64,
  height = "100vh",
  viewportWidth = 1024,
  style
}: DashboardLayoutProps) {
  const resolvedSidebarWidth = normalizeUnit(resolveResponsive(sidebarWidth, viewportWidth) ?? 280)

  return Flex({
    style: { height, overflow: "hidden", ...style },
    children: [
      // Sidebar Area
      (resolvedSidebarWidth !== '0px') && Box({ 
        width: resolvedSidebarWidth, 
        style: { height: "100%", flexShrink: 0, overflow: 'hidden' },
        children: sidebar 
      }),
      
      // Main Content Area (Header + Scrollable Content)
      Flex({
        direction: "column",
        style: { flex: 1, height: "100%", minWidth: 0 },
        children: [
          // Sticky Header
          Box({ 
            height: headerHeight, 
            style: { position: "sticky", top: 0, zIndex: 10, flexShrink: 0 },
            children: header 
          }),
          
          // Scrollable Content
          Box({
            style: { flex: 1, overflowY: "auto", position: "relative", padding: "24px" },
            children
          })
        ]
      })
    ]
  })
}
