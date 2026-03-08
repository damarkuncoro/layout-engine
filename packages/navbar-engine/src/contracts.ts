import { HeadlessNode, CSSLength, BreakpointKey } from "@damarkuncoro/layout-engine"

export type NavbarPosition = "static" | "sticky" | "fixed"
export type NavbarVariant = "light" | "dark" | "transparent" | "solid"

export interface NavbarSlots {
  left?: any // Could be string, HeadlessNode, or array
  center?: any
  right?: any
}

export interface NavbarProps extends NavbarSlots {
  height?: CSSLength
  position?: NavbarPosition
  top?: CSSLength
  variant?: NavbarVariant
  background?: string
  elevation?: boolean
  border?: boolean
  contained?: boolean
  style?: Record<string, any>
  // Responsif
  viewportWidth?: number
  collapseAt?: number | BreakpointKey
  menuOpen?: boolean
  onMenuToggle?: (e?: any) => void
  menuId?: string
  menuItemSelector?: string
  // Scroll-aware (dikontrol dari luar/UI)
  scrolled?: boolean
  shrinkOnScroll?: boolean
  solidOnScroll?: boolean
  centerAbsolute?: boolean
  reduceMotion?: boolean
  // Spacing
  contentPadding?: CSSLength
  barPadding?: CSSLength
}
