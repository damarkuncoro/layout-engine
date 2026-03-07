export type NavbarPosition = "static" | "sticky" | "fixed"
export type NavbarVariant = "light" | "dark" | "transparent" | "solid"

export interface NavbarSlots {
  left?: any
  center?: any
  right?: any
}

export interface NavbarProps extends NavbarSlots {
  height?: number | string
  position?: NavbarPosition
  top?: number | string
  variant?: NavbarVariant
  background?: string
  elevation?: boolean
  border?: boolean
  contained?: boolean
  style?: Record<string, any>
  // Responsif
  viewportWidth?: number
  collapseAt?: number | "sm" | "md" | "lg" | "xl" | "2xl"
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
  contentPadding?: number | string
  barPadding?: number | string
}
