import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import type { LayoutProps, CSSLength, ResponsiveValue } from "../system/types.js"
export interface SpacerProps extends LayoutProps {
  size?: ResponsiveValue<CSSLength>
  axis?: ResponsiveValue<"x" | "y">
}
export function Spacer({
  size = 8,
  axis = "y",
  tag = "div",
  style,
  viewportWidth = 1024,
  ...rest
}: SpacerProps & { children?: any; [key: string]: any }) {
  const resolvedAxis = resolveResponsive(axis, viewportWidth)
  const resolvedSize = normalizeUnit(resolveResponsive(size as any, viewportWidth))
  const resolvedWidth = normalizeUnit(resolveResponsive(rest.width as any, viewportWidth))
  const resolvedHeight = normalizeUnit(resolveResponsive(rest.height as any, viewportWidth))

  const resolved: Record<string, any> = {
    width: resolvedAxis === "x" ? resolvedSize : resolvedWidth ?? "100%",
    height: resolvedAxis === "y" ? resolvedSize : resolvedHeight ?? "100%",
    display: "block",
    ...style
  }
  return {
    type: tag,
    props: {
      style: resolved,
      ...rest
    }
  }
}
