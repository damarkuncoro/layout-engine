import type { CSSLength, LayoutProps } from "../system/types.js"
import { normalizeUnit } from "../core/styleResolver.js"

export interface GridProps extends LayoutProps {
  columns?: number | string
  rows?: number | string
  gap?: CSSLength
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
  ...rest
}: GridProps & { children?: any }) {
  const resolved: Record<string, any> = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    width: normalizeUnit(width),
    height: normalizeUnit(height),
    display: display ?? "grid",
    gridTemplateColumns: toTemplate(columns),
    gridTemplateRows: toTemplate(rows),
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
