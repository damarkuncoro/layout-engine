import type { CSSLength, LayoutProps } from "../system/types.js"
import { normalizeUnit } from "../core/styleResolver.js"

export interface StackProps extends LayoutProps {
  gap?: CSSLength
}

export function Stack({
  children,
  gap = 8,
  padding,
  margin,
  width,
  height,
  display,
  style,
  ...rest
}: StackProps & { children?: any }) {
  const resolved: Record<string, any> = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    width: normalizeUnit(width),
    height: normalizeUnit(height),
    display: display ?? "flex",
    flexDirection: "column",
    gap: normalizeUnit(gap as any),
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
