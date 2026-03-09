import type { CSSLength, LayoutProps, ResponsiveValue } from "../system/types.js"
import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"

export interface GridProps extends LayoutProps {
  columns?: ResponsiveValue<number | string>
  rows?: ResponsiveValue<number | string>
  gap?: ResponsiveValue<CSSLength>
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
  className,
  id,
  tag = "div",
  style,
  viewportWidth = 1024,
  ...rest
}: GridProps & { children?: any; [key: string]: any }) {
  const resolvedColumns = toTemplate(resolveResponsive(columns as any, viewportWidth))
  const resolvedGap = normalizeUnit(resolveResponsive(gap as any, viewportWidth))

  const resolved: Record<string, any> = {
    padding: normalizeUnit(resolveResponsive(padding, viewportWidth)),
    margin: normalizeUnit(resolveResponsive(margin, viewportWidth)),
    width: normalizeUnit(resolveResponsive(width, viewportWidth)),
    height: normalizeUnit(resolveResponsive(height, viewportWidth)),
    display: resolveResponsive(display, viewportWidth) ?? "grid",
    gridTemplateColumns: resolvedColumns,
    gridTemplateRows: toTemplate(resolveResponsive(rows as any, viewportWidth)),
    gap: resolvedGap,
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
