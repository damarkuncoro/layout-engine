import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import type { LayoutProps, CSSLength, ResponsiveValue } from "../system/types.js"

export interface FlexProps extends LayoutProps {
  justify?: ResponsiveValue<string>
  align?: ResponsiveValue<string>
  gap?: ResponsiveValue<CSSLength>
  direction?: ResponsiveValue<"row" | "row-reverse" | "column" | "column-reverse">
  wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">
  tag?: string
}

/**
 * Kontainer fleksibel berbasis style inline (tanpa dependency React).
 * Menghasilkan struktur objek yang merepresentasikan node 'div' dengan style flex.
 */
export function Flex({
  children,
  direction = "row",
  align = "stretch",
  justify = "flex-start",
  gap,
  wrap = "nowrap",
  padding,
  margin,
  width,
  height,
  className,
  id,
  tag = "div",
  style,
  viewportWidth = 1024,
  ...rest
}: (FlexProps & { children?: any; [key: string]: any })) {
  const resolved: Record<string, any> = {
    display: "flex",
    flexDirection: resolveResponsive(direction, viewportWidth),
    alignItems: resolveResponsive(align, viewportWidth),
    justifyContent: resolveResponsive(justify, viewportWidth),
    gap: normalizeUnit(resolveResponsive(gap as any, viewportWidth)),
    flexWrap: resolveResponsive(wrap, viewportWidth),
    padding: normalizeUnit(resolveResponsive(padding, viewportWidth)),
    margin: normalizeUnit(resolveResponsive(margin, viewportWidth)),
    width: normalizeUnit(resolveResponsive(width, viewportWidth)),
    height: normalizeUnit(resolveResponsive(height, viewportWidth)),
    ...style
  }
  return {
    type: tag,
    props: {
      style: resolved,
      className,
      id,
      ...rest,
      children
    }
  }
}
