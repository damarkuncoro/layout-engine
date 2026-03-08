import { theme, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NavbarPosition } from "../contracts.js"

export const getBgForVariant = (variant?: string, fallbackBg?: string): string => {
  if (fallbackBg) return fallbackBg
  switch (variant) {
    case "dark":
      return (theme as any).bgEmphasis ?? "#111827"
    case "light":
      return theme.bg ?? "#ffffff"
    case "transparent":
      return "transparent"
    case "solid":
    default:
      return theme.bg ?? "#ffffff"
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
  boxShadow: elevation ? "0 1px 8px rgba(0,0,0,0.08)" : undefined,
  borderBottom: border ? `1px solid ${theme.border}` : undefined,
  ...style
})
