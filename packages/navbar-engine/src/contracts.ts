import { HeadlessNode, CSSLength, BreakpointKey } from "@damarkuncoro/layout-engine"

export type NavbarPosition = "static" | "sticky" | "fixed"
export type NavbarVariant = "light" | "dark" | "transparent" | "solid"

export interface NavMenuItem {
  id: string
  label: string
  href?: string
  icon?: any
  badge?: string
  dropdown?: NavMenuItem[]
  isExternal?: boolean
  isActive?: boolean
  // Dropdown specific props (optional)
  dropdownVariant?: "light" | "dark" | "glass"
  dropdownWidth?: CSSLength
}

export interface NavbarSlots {
  left?: any // string, HeadlessNode, or array
  center?: any | NavMenuItem[]
  right?: any // string, HeadlessNode, or array
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
  activeItemId?: string // ID menu yang sedang aktif
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

export interface NavbarMainBarProps extends NavbarSlots {
  collapsed: boolean
  menuId: string
  menuOpen: boolean
  onMenuToggle?: (e?: any) => void
  barPadding?: CSSLength
  centerAbsolute?: boolean
  activeItemId?: string
}

export interface NavbarMobilePanelProps {
  collapsed: boolean
  center?: any
  menuId: string
  menuOpen: boolean
  bgResolved: string
  reduceMotion?: boolean
  contained?: boolean
}
