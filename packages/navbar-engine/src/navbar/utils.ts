import { theme, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NavbarPosition } from "../contracts.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export const getBgForVariant = (variant?: string, fallbackBg?: string): string => {
  if (fallbackBg) return fallbackBg
  switch (variant) {
    case "dark":
      return theme.bgEmphasis
    case "light":
      return theme.bg
    case "transparent":
      return "transparent"
    case "solid":
    default:
      return theme.bg
  }
}

interface RootStyleProps {
  position: NavbarPosition
  top: number | string
  computedHeight: string
  backgroundColor: string
  elevation?: boolean
  border?: boolean
  borderRadius?: number | string
  marginTop?: number | string
  width?: number | string
  maxWidth?: number | string
  left?: string
  transform?: string
  style?: Record<string, any>
}

export const computeNavbarHeight = (
  height: string | number | undefined,
  scrolled: boolean,
  shrinkOnScroll: boolean
): string => {
  if (scrolled && shrinkOnScroll) {
    const numericHeight = typeof height === "number" ? height : parseInt(height as string) || NAVBAR_DEFAULTS.HEIGHT
    return normalizeUnit(Math.max(NAVBAR_DEFAULTS.HEIGHT_SHRUNK, numericHeight - 12)) || `${NAVBAR_DEFAULTS.HEIGHT_SHRUNK}px`
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
  borderRadius,
  marginTop,
  width,
  maxWidth,
  left,
  transform,
  style
}: RootStyleProps) => ({
  position,
  top: normalizeUnit(top as any),
  minHeight: computedHeight,
  backgroundColor,
  boxShadow: elevation ? NAVBAR_DEFAULTS.SHADOW_LIGHT : undefined,
  borderBottom: border ? `1px solid ${theme.border}` : undefined,
  borderRadius: borderRadius ? normalizeUnit(borderRadius as any) : undefined,
  marginTop: marginTop ? normalizeUnit(marginTop as any) : undefined,
  width: width ? normalizeUnit(width as any) : undefined,
  maxWidth: maxWidth ? normalizeUnit(maxWidth as any) : undefined,
  left,
  transform,
  ...style
})
