import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import { Container } from "../primitives/Container.js"
import type { NodeLike } from "../system/contracts.js"

export interface LandingLayoutProps {
  header?: NodeLike
  hero?: NodeLike
  features?: NodeLike
  pricing?: NodeLike
  footer?: NodeLike
  children?: NodeLike
}

/**
 * LandingLayout - layout untuk halaman landing page
 * Dengan section hero, features, pricing, dan footer
 */
export function LandingLayout({
  header,
  hero,
  features,
  pricing,
  footer,
  children
}: LandingLayoutProps) {
  return Flex({
    direction: "column",
    children: [
      // Sticky header
      header ? Box({
        style: { position: "sticky", top: 0, zIndex: 10 },
        children: Container({
          children: header
        })
      }) : null,
      
      // Main content
      Box({
        children: children ?? Flex({
          direction: "column",
          children: [
            hero ? Box({ children: hero }) : null,
            features ? Box({ children: features }) : null,
            pricing ? Box({ children: pricing }) : null
          ].filter(Boolean)
        })
      }),
      
      // Footer
      footer ? Box({
        children: Container({
          padding: 6,
          children: footer
        })
      }) : null
    ].filter(Boolean)
  })
}