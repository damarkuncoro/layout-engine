import { normalizeUnit } from "../core/styleResolver.js"
import type { LayoutProps } from "../system/types.js"

export { type LayoutProps }

/**
 * Komponen blok dasar yang memetakan LayoutProps → inline style.
 * Gunakan untuk membangun primitive lainnya.
 */
export function Box({
  children,
  padding,
  margin,
  width,
  height,
  display,
  style,
  ...rest
}: LayoutProps & { children?: any }) {
  const resolved: Record<string, any> = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    width: normalizeUnit(width),
    height: normalizeUnit(height),
    display,
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
