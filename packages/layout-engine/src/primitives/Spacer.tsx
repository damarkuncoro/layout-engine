import { normalizeUnit } from "../core/styleResolver.js"
import type { LayoutProps, CSSLength } from "../system/types.js"
export interface SpacerProps extends LayoutProps {
  size?: CSSLength
  axis?: "x" | "y"
}
export function Spacer({
  size = 8,
  axis = "y",
  style,
  ...rest
}: SpacerProps & { children?: any }) {
  const resolved: Record<string, any> = {
    width: axis === "x" ? normalizeUnit(size) : normalizeUnit(rest.width) ?? "100%",
    height: axis === "y" ? normalizeUnit(size) : normalizeUnit(rest.height) ?? "100%",
    display: "block",
    ...style
  }
  return {
    type: "div",
    props: {
      style: resolved,
      ...rest
    }
  }
}
