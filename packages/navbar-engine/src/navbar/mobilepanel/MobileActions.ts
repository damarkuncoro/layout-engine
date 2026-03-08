import { Flex, Box, theme } from "@damarkuncoro/layout-engine"
import type { NavbarAction } from "../../contracts.js"

export function MobileActions({ actions }: { actions?: NavbarAction[] }) {
  if (!actions || actions.length === 0) return null
  
  return Flex({
    direction: "column",
    gap: "8px",
    style: { padding: "16px" },
    children: actions.map(action => 
      Box({
        tag: action.href ? "a" : "button",
        key: action.id,
        href: action.href,
        onClick: action.onClick,
        style: {
          width: "100%",
          padding: "12px",
          textAlign: "center",
          borderRadius: theme.radiusMd,
          fontSize: theme.textBase,
          fontWeight: theme.fontSemibold,
          textDecoration: "none",
          backgroundColor: action.variant === "primary" ? theme.primary : theme.bgMuted,
          color: action.variant === "primary" ? theme.primaryFg : theme.fg,
          border: "none",
          cursor: "pointer"
        },
        children: action.label
      })
    )
  })
}
