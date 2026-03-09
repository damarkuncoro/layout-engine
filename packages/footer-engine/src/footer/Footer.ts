import { Box, Flex, Stack, Container, Grid, normalizeUnit, theme } from "@damarkuncoro/layout-engine"
import type { 
  FooterProps, 
  FooterLinksProps, 
  FooterSocialsProps, 
  FooterBottomProps 
} from "../contracts.js"

// --- Sub-components ---

export function FooterLinks({ sections, columns = 4, style }: FooterLinksProps) {
  return Grid({
    columns: `repeat(${columns}, 1fr)`,
    gap: "32px",
    style: { flex: 1, ...style },
    children: sections.map((section, idx) => 
      Stack({
        gap: "16px",
        ...({ key: idx } as any),
        children: [
          Box({ style: { fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }, children: section.title }),
          Stack({
            gap: "8px",
            children: section.links.map((link, lIdx) => 
              Box({
                tag: "a",
                key: lIdx,
                href: link.href,
                style: { textDecoration: "none", color: "inherit", opacity: 0.7, fontSize: "0.875rem", transition: "opacity 0.2s" },
                children: link.label
              } as any)
            )
          })
        ]
      })
    )
  })
}

export function FooterSocials({ items, style }: FooterSocialsProps) {
  return Flex({
    gap: "16px",
    style: { ...style },
    children: items.map((social) => 
      Box({
        tag: "a",
        key: social.id,
        href: social.href,
        "aria-label": social.label,
        style: { color: "inherit", opacity: 0.7, display: "flex", alignItems: "center" },
        children: social.icon
      } as any)
    )
  })
}

export function FooterBottom({ children, style }: FooterBottomProps) {
  return Box({
    style: {
      borderTop: `1px solid ${theme.border}`,
      paddingTop: "24px",
      marginTop: "48px",
      ...style
    },
    children
  })
}

// --- Main Footer Component ---

export function Footer(props: FooterProps) {
  const {
    logo,
    copyright,
    sections = [],
    socials = [],
    bottomLinks = [],
    background,
    color,
    paddingY = "64px",
    paddingX = "24px",
    contained = true,
    style,
    children
  } = props

  if (children) {
    return Box({
      tag: "footer",
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

  const mainContent = Flex({
    direction: "column",
    gap: "48px",
    children: [
      Flex({
        direction: "row",
        justify: "space-between",
        align: "flex-start",
        gap: "48px",
        style: { flexWrap: "wrap" },
        children: [
          Stack({
            gap: "24px",
            style: { maxWidth: "300px" },
            children: [
              logo ? Box({ children: logo }) : null,
              socials.length > 0 ? FooterSocials({ items: socials }) : null
            ].filter(Boolean)
          }),
          sections.length > 0 ? FooterLinks({ sections }) : null
        ].filter(Boolean)
      }),
      FooterBottom({
        children: Flex({
          justify: "space-between",
          align: "center",
          style: { flexWrap: "wrap", gap: "16px" },
          children: [
            copyright ? Box({ tag: "span", style: { fontSize: "0.875rem", opacity: 0.6 }, children: copyright }) : null,
            bottomLinks.length > 0 ? Flex({
              gap: "24px",
              children: bottomLinks.map((link, idx) => 
                Box({
                  tag: "a",
                  key: idx,
                  href: link.href,
                  style: { textDecoration: "none", color: "inherit", fontSize: "0.875rem", opacity: 0.6 },
                  children: link.label
                } as any)
              )
            }) : null
          ].filter(Boolean)
        })
      })
    ]
  })

  return Box({
    tag: "footer",
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

Footer.Links = FooterLinks
Footer.Socials = FooterSocials
Footer.Bottom = FooterBottom
