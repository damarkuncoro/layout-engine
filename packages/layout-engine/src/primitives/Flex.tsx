import { normalizeUnit } from "../core/styleResolver.js"
import type { LayoutProps, CSSLength } from "../system/types.js"

export interface FlexProps extends LayoutProps {
  justify?: string
  align?: string
  gap?: CSSLength
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
}

/**
 * Kontainer fleksibel berbasis style inline (tanpa dependency React).
 * Menghasilkan struktur objek yang merepresentasikan node 'div' dengan style flex.
 */
export function Flex({
  children,
  justify,
  align,
  gap,
  direction = "row",
  padding,
  margin,
  width,
  height,
  display,
  style,
  ...rest
}: FlexProps & { children?: any }) {
  const resolved: Record<string, any> = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    width: normalizeUnit(width),
    height: normalizeUnit(height),
    display: display ?? "flex",
    justifyContent: justify,
    alignItems: align,
    gap: normalizeUnit(gap as any),
    flexDirection: direction,
    ...style
  }
  return {
    type: "div",
    props: {
      style: resolved,
      ...rest,
      children
    }
  }
}
