import { Box, theme } from "@damarkuncoro/layout-engine"
import type { NavbarSearchProps } from "../../contracts.js"

export function MobileSearch(props: NavbarSearchProps) {
  if (!props || !props.showOnMobile) return null
  
  return Box({
    style: { padding: "12px 16px", borderBottom: `1px solid ${theme.border}` },
    children: Box({
      tag: "input",
      placeholder: props.placeholder || "Search...",
      value: props.value,
      onInput: (e: any) => props.onChange?.(e.target.value),
      style: {
        width: "100%",
        padding: "10px 16px",
        borderRadius: theme.radiusMd,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.bgSubtle,
        fontSize: theme.textBase
      }
    })
  })
}
