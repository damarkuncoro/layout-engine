import { Box, Flex, Stack, Container, normalizeUnit, breakpoints } from "@damarkuncoro/layout-engine"
import type { HeroProps } from "../contracts.js"

export function Hero(props: HeroProps) {
  const {
    pattern = "split",
    title,
    description,
    actions = [],
    visual,
    height,
    minHeight = "600px",
    maxHeight,
    background,
    paddingY = "80px",
    paddingX = "24px",
    viewportWidth,
    collapseAt = "md",
    reverse = false,
    style
  } = props

  const threshold =
    typeof collapseAt === "number"
      ? collapseAt
      : (breakpoints as Record<string, number>)[collapseAt ?? "md"] ?? (breakpoints as Record<string, number>).md
  const isCollapsed = typeof viewportWidth === "number" ? viewportWidth < threshold : false

  const content = Stack({
    gap: "24px",
    style: { flex: 1, textAlign: pattern === "centered" ? "center" : "left" },
    children: [
      title ? Box({ tag: "h1", children: title }) : null,
      description ? Box({ tag: "p", children: description }) : null,
      actions.length > 0
        ? Flex({
            gap: "12px",
            justify: pattern === "centered" ? "center" : "flex-start",
            children: actions.map((action, idx) =>
              Box({
                tag: action.href ? "a" : "button",
                key: action.id || idx,
                href: action.href,
                onClick: action.onClick,
                children: action.label
              } as any)
            )
          })
        : null
    ].filter(Boolean)
  })

  const visualPart = visual ? Box({ style: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }, children: visual }) : null

  const rootStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: normalizeUnit(minHeight as any),
    height: normalizeUnit(height as any),
    maxHeight: normalizeUnit(maxHeight as any),
    backgroundColor: background,
    paddingTop: normalizeUnit(paddingY as any),
    paddingBottom: normalizeUnit(paddingY as any),
    paddingLeft: normalizeUnit(paddingX as any),
    paddingRight: normalizeUnit(paddingX as any),
    ...style
  }

  if (pattern === "centered") {
    return Box({
      tag: "section",
      style: rootStyle,
      children: Container({
        children: Flex({
          direction: "column",
          gap: "40px",
          align: "center",
          children: [content, visualPart].filter(Boolean)
        })
      })
    })
  }

  return Box({
    tag: "section",
    style: rootStyle,
    children: Container({
      children: Flex({
        direction: isCollapsed ? "column" : (reverse ? "row-reverse" : "row"),
        align: "center",
        gap: "40px",
        children: [content, visualPart].filter(Boolean)
      })
    })
  })
}
