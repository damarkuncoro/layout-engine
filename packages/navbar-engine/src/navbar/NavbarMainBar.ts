import { Box, Flex, normalizeUnit, theme } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"
import type { NavbarMainBarProps, NavMenuItem } from "../contracts.js"

export function NavbarMainBar({
  left,
  center,
  right,
  collapsed,
  menuId,
  menuOpen,
  onMenuToggle,
  barPadding,
  centerAbsolute,
  activeItemId
}: NavbarMainBarProps) {
  const commonFlexProps = {
    justify: "space-between",
    align: "center",
    height: "100%",
    style: barPadding != null ? { padding: normalizeUnit(barPadding as any) } : undefined
  }

  // Helper untuk merender menu item secara semantik
  const renderMenuItems = (items: any) => {
    if (!Array.isArray(items)) return items

    return Flex({
      tag: "ul",
      gap: NAVBAR_DEFAULTS.GAP_DEFAULT,
      style: { listStyle: "none", margin: 0, padding: 0 },
      children: items.map((item: NavMenuItem) => 
        Box({
          tag: "li",
          key: item.id,
          children: Box({
            tag: "a",
            href: item.href || "#",
            style: {
              textDecoration: "none",
              color: item.id === activeItemId || item.isActive ? theme.primary : "inherit",
              fontWeight: item.id === activeItemId || item.isActive ? theme.fontBold : theme.fontNormal,
              fontSize: theme.textSm,
              transition: NAVBAR_DEFAULTS.TRANSITION_PANEL,
              display: "flex",
              alignItems: "center",
              gap: "4px"
            },
            children: [
              item.icon ? Box({ children: item.icon }) : null,
              item.label,
              item.dropdown ? "▾" : null
            ].filter(Boolean)
          })
        })
      )
    })
  }

  const centerContent = renderMenuItems(center)

  if (!centerAbsolute) {
    return Flex({
      tag: "nav",
      ...commonFlexProps,
      children: [
        Box({ children: left }),
        !collapsed ? (centerContent ? Box({ children: centerContent }) : null) : null,
        collapsed && centerContent
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
      ]
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
