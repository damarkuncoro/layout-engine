import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { DashboardLayoutContract } from "../system/contracts.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import { normalizeUnit } from "../core/styleResolver.js"
import type { CSSLength, ResponsiveValue } from "../system/types.js"

export interface DashboardLayoutProps extends DashboardLayoutContract {
  sidebarWidth?: ResponsiveValue<CSSLength>
  headerHeight?: ResponsiveValue<CSSLength>
  height?: ResponsiveValue<CSSLength>
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
  const resolvedHeaderHeight = normalizeUnit(resolveResponsive(headerHeight, viewportWidth) ?? 64)
  const resolvedHeight = normalizeUnit(resolveResponsive(height, viewportWidth) ?? "100vh")

  return Flex({
    viewportWidth,
    style: { height: resolvedHeight, overflow: "hidden", ...style },
    children: [
      // Sidebar Area
      (resolvedSidebarWidth !== '0px') && Box({ 
        viewportWidth,
        tag: "aside",
        width: resolvedSidebarWidth, 
        style: { height: "100%", flexShrink: 0, overflow: 'hidden' },
        children: sidebar 
      }),
      
      // Main Content Area (Header + Scrollable Content)
      Flex({
        viewportWidth,
        direction: "column",
        style: { flex: 1, height: "100%", minWidth: 0 },
        children: [
          // Sticky Header
          Box({ 
            viewportWidth,
            tag: "header",
            height: resolvedHeaderHeight, 
            style: { position: "sticky", top: 0, zIndex: 10, flexShrink: 0 },
            children: header 
          }),
          
          // Scrollable Content
          Box({
            viewportWidth,
            tag: "main",
            style: { flex: 1, overflowY: "auto", position: "relative", padding: "24px" },
            children
          })
        ]
      })
    ]
  })
}
