import { Box, Flex, Stack, Container, Grid, normalizeUnit, theme } from "@damarkuncoro/layout-engine"
import type { 
  FeaturesProps, 
  FeatureItemProps, 
  FeaturesHeaderProps 
} from "../contracts.js"

// --- Sub-components ---

export function FeaturesHeader({ title, subtitle, align = "center", style }: FeaturesHeaderProps) {
  return Stack({
    gap: "16px",
    align: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
    style: { marginBottom: "64px", textAlign: align, ...style },
    children: [
      title ? Box({ 
        tag: "h2", 
        style: { fontSize: "2.5rem", fontWeight: 800, margin: 0, color: theme.fg },
        children: title 
      }) : null,
      subtitle ? Box({ 
        tag: "p", 
        style: { fontSize: "1.125rem", color: theme.fgSubtle, maxWidth: "700px", margin: 0 },
        children: subtitle 
      }) : null
    ].filter(Boolean)
  })
}

export function FeatureCard({ title, description, icon, image, link, pattern, style }: FeatureItemProps) {
  const isGrid = pattern === "grid" || pattern === "cards"
  
  return Box({
    style: {
      padding: isGrid ? "32px" : "0",
      backgroundColor: pattern === "cards" ? theme.bg : "transparent",
      borderRadius: pattern === "cards" ? "16px" : "0",
      border: pattern === "cards" ? `1px solid ${theme.border}` : "none",
      boxShadow: pattern === "cards" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": pattern === "cards" ? { transform: "translateY(-4px)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" } : {},
      ...style
    },
    children: Stack({
      gap: "20px",
      align: isGrid ? "flex-start" : "flex-start",
      children: [
        icon ? Box({
          style: { 
            width: "48px", 
            height: "48px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            backgroundColor: theme.bgSubtle,
            color: theme.primary,
            borderRadius: "12px"
          },
          children: icon
        }) : null,
        image ? Box({
          tag: "img",
          src: image,
          style: { width: "100%", height: "200px", objectFit: "cover" as const, borderRadius: "12px" }
        } as any) : null,
        Stack({
          gap: "8px",
          children: [
            Box({ tag: "h3", style: { fontSize: "1.25rem", fontWeight: 700, margin: 0 }, children: title }),
            Box({ tag: "p", style: { fontSize: "1rem", color: theme.fgSubtle, margin: 0, lineHeight: 1.6 }, children: description }),
            link ? Box({
              tag: "a",
              href: link.href,
              style: { color: theme.primary, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" },
              children: [link.label, " →"]
            } as any) : null
          ]
        })
      ].filter(Boolean)
    })
  })
}

// --- Main Features Component ---

export function Features(props: FeaturesProps) {
  const {
    pattern = "grid",
    title,
    subtitle,
    items = [],
    columns = 3,
    background,
    color,
    paddingY = "96px",
    paddingX = "24px",
    contained = true,
    style,
    children
  } = props

  if (children) {
    return Box({
      tag: "section",
      style: {
        backgroundColor: background,
        color,
        paddingTop: normalizeUnit(paddingY as any),
        paddingBottom: normalizeUnit(paddingY as any),
        ...style
      },
      children: contained ? Container({ children }) : children
    })
  }

  const header = (title || subtitle) ? FeaturesHeader({ title, subtitle }) : null

  let content
  if (pattern === "grid" || pattern === "cards") {
    content = Grid({
      columns: `repeat(${columns}, 1fr)`,
      gap: "32px",
      children: items.map((item) => FeatureCard({ ...item, pattern }))
    })
  } else if (pattern === "list") {
    content = Stack({
      gap: "48px",
      children: items.map((item) => FeatureCard({ ...item, pattern }))
    })
  } else if (pattern === "split") {
    content = Stack({
      gap: "64px",
      children: items.map((item, idx) => 
        Flex({
          direction: idx % 2 === 0 ? "row" : "row-reverse",
          gap: "64px",
          align: "center",
          style: { flexWrap: "wrap" as const },
          children: [
            Box({
              style: { flex: 1, minWidth: "300px" },
              children: FeatureCard({ ...item, pattern })
            }),
            item.image ? Box({
              style: { flex: 1, minWidth: "300px" },
              children: Box({
                tag: "img",
                src: item.image,
                style: { width: "100%", borderRadius: "24px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }
              } as any)
            }) : null
          ].filter(Boolean)
        })
      )
    })
  }

  const mainContent = Stack({
    children: [
      header,
      content
    ].filter(Boolean)
  })

  return Box({
    tag: "section",
    style: {
      backgroundColor: background,
      color,
      paddingTop: normalizeUnit(paddingY as any),
      paddingBottom: normalizeUnit(paddingY as any),
      paddingLeft: normalizeUnit(paddingX as any),
      paddingRight: normalizeUnit(paddingX as any),
      ...style
    },
    children: contained ? Container({ children: mainContent }) : mainContent
  })
}

Features.Header = FeaturesHeader
Features.Card = FeatureCard
