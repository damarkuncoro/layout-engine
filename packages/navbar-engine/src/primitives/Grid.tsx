import type { CSSLength, LayoutProps, ResponsiveValue } from "../system/types.js"
import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"

export interface GridProps extends LayoutProps {
  columns?: number | string | ResponsiveValue<number>
  rows?: number | string
  gap?: CSSLength | ResponsiveValue<CSSLength>
  viewportWidth?: number
}

const toTemplate = (v?: number | string) => {
  if (typeof v === "number") return `repeat(${v}, minmax(0, 1fr))`
  return v
}

export function Grid({
  children,
  columns,
  rows,
  gap,
  padding,
  margin,
  width,
  height,
  display,
  style,
  viewportWidth = 1024,
  ...rest
}: GridProps & { children?: any }) {
  const resolvedColumns = typeof columns === "object"
    ? resolveResponsive(columns as ResponsiveValue<number>, viewportWidth)
    : toTemplate(columns)
  
  const resolvedGap = typeof gap === "object"
    ? normalizeUnit(resolveResponsive(gap as ResponsiveValue<CSSLength>, viewportWidth))
    : normalizeUnit(gap as any)

  const resolved: Record<string, any> = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    width: normalizeUnit(width),
    height: normalizeUnit(height),
    display: display ?? "grid",
    gridTemplateColumns: resolvedColumns,
    gridTemplateRows: toTemplate(rows),
    gap: resolvedGap,
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
