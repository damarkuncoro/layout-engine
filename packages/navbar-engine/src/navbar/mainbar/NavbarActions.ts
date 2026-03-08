import { Flex, Box, theme } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavbarAction } from "../../contracts.js"

export function NavbarActions({ actions }: { actions: NavbarAction[] }) {
  if (!actions || actions.length === 0) return null
  
  return Flex({
    gap: "8px",
    children: actions.map(action => 
      Box({
        tag: action.href ? "a" : "button",
        key: action.id,
        href: action.href,
        onClick: action.onClick,
        style: {
          padding: "8px 16px",
          borderRadius: theme.radiusMd,
          fontSize: theme.textSm,
          fontWeight: theme.fontSemibold,
          cursor: "pointer",
          textDecoration: "none",
          border: action.variant === "outline" ? `1px solid ${theme.border}` : "none",
          backgroundColor: action.variant === "primary" ? theme.primary : 
                          action.variant === "secondary" ? theme.secondary : 
                          "transparent",
          color: action.variant === "primary" ? theme.primaryFg :
                 action.variant === "secondary" ? theme.secondaryFg :
                 "inherit",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: NAVBAR_DEFAULTS.TRANSITION_FAST
        },
        children: [
          action.icon ? Box({ children: action.icon }) : null,
          action.label
        ].filter(Boolean)
      })
    )
  })
}
