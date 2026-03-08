import { Box, Flex, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarMainBar({
  left,
  center,
  right,
  collapsed,
  menuId,
  menuOpen,
  onMenuToggle,
  barPadding,
  centerAbsolute
}: any) {
  const commonFlexProps = {
    justify: "space-between",
    align: "center",
    height: "100%",
    style: barPadding != null ? { padding: normalizeUnit(barPadding as any) } : undefined
  }

  if (!centerAbsolute) {
    return Flex({
      ...commonFlexProps,
      children: [
        Box({ children: left }),
        !collapsed ? (center ? Box({ children: center }) : null) : null,
        collapsed && center
          ? Box({
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
              style: { cursor: "pointer", padding: NAVBAR_DEFAULTS.BAR_PADDING, userSelect: "none" },
              children: "☰"
            } as any)
          : Box({ children: right })
      ]
    })
  }

  return Box({
    style: { position: "relative", height: "100%" },
    children: [
      Flex({
        ...commonFlexProps,
        children: [Box({ children: left }), Box({ children: right })]
      }),
      center
        ? Box({
            style: {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            },
            children: center
          })
        : null
    ]
  })
}
