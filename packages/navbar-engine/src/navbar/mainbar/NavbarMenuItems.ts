import { Flex, Box, theme, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavMenuItem } from "../../contracts.js"

interface NavbarMenuItemsProps {
  items: any
  activeItemId?: string
}

export function NavbarMenuItems({ items, activeItemId }: NavbarMenuItemsProps) {
  if (!Array.isArray(items)) return items

  return Flex({
    tag: "ul",
    gap: NAVBAR_DEFAULTS.GAP_DEFAULT,
    style: { listStyle: "none", margin: 0, padding: 0 },
    children: items.map((item: NavMenuItem) => {
      const hasDropdown = item.dropdown && item.dropdown.length > 0
      
      return Box({
        tag: "li",
        key: item.id,
        style: { position: "relative" },
        children: [
          Box({
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
              gap: "4px",
              padding: "8px 0"
            },
            children: [
              item.icon ? Box({ children: item.icon }) : null,
              item.label,
              hasDropdown ? Box({ style: { fontSize: "0.8em" }, children: "▾" }) : null
            ].filter(Boolean)
          }),
          // Render Dropdown (Desktop)
          hasDropdown ? Box({
            tag: "ul",
            className: "navbar-dropdown",
            style: {
              position: "absolute",
              top: "100%",
              left: "0",
              minWidth: normalizeUnit(item.dropdownWidth ?? 200),
              backgroundColor: item.dropdownVariant === "glass" ? NAVBAR_DEFAULTS.GLASS_BG : theme.bg,
              boxShadow: NAVBAR_DEFAULTS.SHADOW_MD,
              borderRadius: theme.radiusMd,
              border: `1px solid ${theme.border}`,
              padding: "8px",
              margin: "4px 0 0 0",
              listStyle: "none",
              opacity: 0,
              visibility: "hidden",
              transform: "translateY(8px)",
              transition: NAVBAR_DEFAULTS.TRANSITION_FAST,
              zIndex: 10,
              ...(item.dropdownVariant === "glass" && {
                backdropFilter: `${NAVBAR_DEFAULTS.SATURATE_AMOUNT} ${NAVBAR_DEFAULTS.BLUR_AMOUNT}`,
                WebkitBackdropFilter: `${NAVBAR_DEFAULTS.SATURATE_AMOUNT} ${NAVBAR_DEFAULTS.BLUR_AMOUNT}`,
              })
            },
            children: item.dropdown?.map((sub: NavMenuItem) => 
              Box({
                tag: "li",
                key: sub.id,
                children: Box({
                  tag: "a",
                  href: sub.href || "#",
                  style: {
                    display: "block",
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: theme.textSm,
                    borderRadius: theme.radiusSm,
                    transition: NAVBAR_DEFAULTS.TRANSITION_FAST,
                  },
                  children: sub.label
                })
              })
            )
          }) : null
        ].filter(Boolean)
      })
    })
  })
}
