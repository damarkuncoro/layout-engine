import { Box, theme } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavbarSearchProps } from "../../contracts.js"

export function NavbarSearch(props: NavbarSearchProps) {
  if (!props) return null
  
  return Box({
    tag: "div",
    style: {
      position: "relative",
      flex: 1,
      maxWidth: "320px",
      margin: "0 24px"
    },
    children: Box({
      tag: "input",
      type: "text",
      placeholder: props.placeholder || "Search...",
      value: props.value,
      onInput: (e: any) => props.onChange?.(e.target.value),
      style: {
        width: "100%",
        padding: "8px 16px",
        paddingLeft: "36px",
        borderRadius: theme.radiusFull,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.bgSubtle,
        fontSize: theme.textSm,
        outline: "none",
        transition: NAVBAR_DEFAULTS.TRANSITION_FAST
      }
    })
  })
}
