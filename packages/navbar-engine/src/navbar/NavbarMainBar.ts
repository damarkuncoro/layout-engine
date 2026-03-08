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
  activeItemId,
  search,
  actions
}: NavbarMainBarProps) {
  const commonFlexProps = {
    justify: "space-between",
    align: "center",
    height: "100%",
    style: barPadding != null ? { padding: normalizeUnit(barPadding as any) } : undefined
  }

  // Helper untuk merender Search Bar
  const renderSearch = (searchProps?: any) => {
    if (!searchProps) return null
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
        placeholder: searchProps.placeholder || "Search...",
        value: searchProps.value,
        onInput: (e: any) => searchProps.onChange?.(e.target.value),
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

  // Helper untuk merender Action Buttons
  const renderActions = (actionsList?: any[]) => {
    if (!actionsList || actionsList.length === 0) return null
    return Flex({
      gap: "8px",
      children: actionsList.map(action => 
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

  // Helper untuk merender menu item secara semantik
  const renderMenuItems = (items: any) => {
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
          style: { position: "relative" }, // Container for dropdown
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
              className: "navbar-dropdown", // Hook for CSS or adaptations
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
                opacity: 0, // Hidden by default, controlled by hover/state externally
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

  const centerContent = renderMenuItems(center)

  if (!centerAbsolute) {
    return Flex({
      tag: "nav",
      ...commonFlexProps,
      children: [
        Box({ children: left }),
        !collapsed ? (centerContent ? Box({ children: centerContent }) : null) : null,
        !collapsed ? renderSearch(search) : null,
        !collapsed ? renderActions(actions) : null,
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
