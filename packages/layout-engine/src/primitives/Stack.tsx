import type { CSSLength, LayoutProps, ResponsiveValue } from "../system/types.js"
import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"

export interface StackProps extends LayoutProps {
  gap?: ResponsiveValue<CSSLength>
}

export function Stack({
  children,
  gap,
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
}: (StackProps & { children?: any; [key: string]: any })) {
  const resolved: Record<string, any> = {
    display: "flex",
    flexDirection: "column",
    gap: normalizeUnit(resolveResponsive(gap as any, viewportWidth)),
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
