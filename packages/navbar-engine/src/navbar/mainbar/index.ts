import { Box, Flex, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavbarMainBarProps } from "../../contracts.js"
import { NavbarSearch } from "./NavbarSearch.js"
import { NavbarActions } from "./NavbarActions.js"
import { NavbarMenuItems } from "./NavbarMenuItems.js"

export function NavbarMainBar({
  left,
  center,
  right,
  collapsed,
  menuId,
  menuOpen,
  onMenuToggle,
  barPadding,
  paddingY,
  paddingX,
  centerAbsolute,
  activeItemId,
  search,
  actions
}: NavbarMainBarProps) {
  const commonFlexProps = {
    justify: "space-between",
    align: "center",
    height: "100%",
    style: { 
      paddingLeft: normalizeUnit(paddingX as any),
      paddingRight: normalizeUnit(paddingX as any),
      paddingTop: normalizeUnit(paddingY as any),
      paddingBottom: normalizeUnit(paddingY as any),
      ...(barPadding != null ? { padding: normalizeUnit(barPadding as any) } : {})
    }
  }

  const centerContent = NavbarMenuItems({ items: center, activeItemId })

  if (!centerAbsolute) {
    return Flex({
      tag: "nav",
      ...commonFlexProps,
      children: [
        Box({ children: left }),
        !collapsed ? (centerContent ? Box({ children: centerContent }) : null) : null,
        !collapsed ? NavbarSearch(search as any) : null,
        !collapsed ? NavbarActions({ actions: actions as any }) : null,
        collapsed && (centerContent || search || actions)
          ? Box({
              tag: "button",
              role: "button",
              "aria-label": "Toggle menu",
              "aria-controls": menuId,
              "aria-expanded": !!menuOpen,
              onClick: onMenuToggle,
              onKeyDown: (e: any) => {
                const k = e?.key
                if (k === "Enter" || k === " ") {
                  e.preventDefault?.()
                  onMenuToggle?.(e)
                }
              },
              style: { 
                cursor: "pointer", 
                padding: NAVBAR_DEFAULTS.BAR_PADDING, 
                userSelect: "none",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "inherit"
              },
              children: "☰"
            } as any)
          : Box({ children: right })
      ].filter(item => item !== null)
    })
  }

  return Box({
    tag: "nav",
    style: { position: "relative", height: "100%" },
    children: [
      Flex({
        ...commonFlexProps,
        children: [Box({ children: left }), Box({ children: right })]
      }),
      !collapsed && centerContent
        ? Box({
            style: {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            },
            children: centerContent
          })
        : null
    ]
  })
}
