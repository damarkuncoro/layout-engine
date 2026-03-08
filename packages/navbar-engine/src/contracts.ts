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

export interface NavbarSearchProps {
  placeholder?: string
  onChange?: (val: string) => void
  onSearch?: (val: string) => void
  value?: string
  showOnMobile?: boolean
}

export interface NavbarAction {
  id: string
  label: string
  onClick?: (e?: any) => void
  href?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  icon?: any
}

export interface NavbarSlots {
  left?: any // string, HeadlessNode, or array
  center?: any | NavMenuItem[]
  right?: any // string, HeadlessNode, or array
  search?: NavbarSearchProps
  actions?: NavbarAction[]
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
  // Spacing & Appearance
  contentPadding?: CSSLength
  barPadding?: CSSLength
  paddingY?: CSSLength
  paddingX?: CSSLength
  shrinkPaddingY?: CSSLength
  borderRadius?: CSSLength
  alignment?: "left" | "center" | "right" | "between"
  // Floating
  isFloating?: boolean
  floatingMarginTop?: CSSLength
  floatingWidth?: CSSLength
  floatingMaxWidth?: CSSLength
}

export interface NavbarMainBarProps extends NavbarSlots {
  collapsed: boolean
  menuId: string
  menuOpen: boolean
  onMenuToggle?: (e?: any) => void
  barPadding?: CSSLength
  paddingY?: CSSLength
  paddingX?: CSSLength
  alignment?: "left" | "center" | "right" | "between"
  centerAbsolute?: boolean
  activeItemId?: string
  search?: NavbarSearchProps
  actions?: NavbarAction[]
}

export interface NavbarMobilePanelProps {
  collapsed: boolean
  center?: any
  search?: NavbarSearchProps
  actions?: NavbarAction[]
  menuId: string
  menuOpen: boolean
  bgResolved: string
  reduceMotion?: boolean
  contained?: boolean
}
