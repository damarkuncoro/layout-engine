import { theme, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NavbarPosition } from "../contracts.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export const getBgForVariant = (variant?: string, fallbackBg?: string): string => {
  if (fallbackBg) return fallbackBg
  switch (variant) {
    case "dark":
      return (theme as any).bgEmphasis ?? NAVBAR_DEFAULTS.FALLBACK_BG_DARK
    case "light":
      return theme.bg ?? NAVBAR_DEFAULTS.FALLBACK_BG_LIGHT
    case "transparent":
      return "transparent"
    case "solid":
    default:
      return theme.bg ?? NAVBAR_DEFAULTS.FALLBACK_BG_LIGHT
  }
}

interface RootStyleProps {
  position: NavbarPosition
  top: number | string
  computedHeight: string
  backgroundColor: string
  elevation?: boolean
  border?: boolean
  style?: Record<string, any>
}

export const computeNavbarHeight = (
  height: string | number | undefined,
  scrolled: boolean,
  shrinkOnScroll: boolean
): string => {
  if (scrolled && shrinkOnScroll) {
    const numericHeight = typeof height === "number" ? height : parseInt(height as string) || NAVBAR_DEFAULTS.HEIGHT
    return normalizeUnit(Math.max(NAVBAR_DEFAULTS.HEIGHT_SHRUNK, numericHeight - 8)) || `${NAVBAR_DEFAULTS.HEIGHT_SHRUNK}px`
  }
  return normalizeUnit(height as any) || `${NAVBAR_DEFAULTS.HEIGHT}px`
}

export const getNavbarRootStyle = ({
  position,
  top,
  computedHeight,
  backgroundColor,
  elevation,
  border,
  style
}: RootStyleProps) => ({
  position,
  top: normalizeUnit(top as any),
  minHeight: computedHeight,
  backgroundColor,
  boxShadow: elevation ? NAVBAR_DEFAULTS.SHADOW_LIGHT : undefined,
  borderBottom: border ? `1px solid ${theme.border}` : undefined,
  ...style
})
