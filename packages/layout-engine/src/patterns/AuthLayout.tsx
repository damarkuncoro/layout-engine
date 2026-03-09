import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { NodeLike } from "../system/contracts.js"

export interface AuthLayoutProps {
  children: NodeLike
  logo?: NodeLike
  subtitle?: string
  viewportWidth?: number
}

/**
 * AuthLayout - layout untuk halaman login/register
 * Konsisten centered dengan form di tengah layar
 */
export function AuthLayout({
  children,
  logo,
  subtitle,
  viewportWidth = 1024
}: AuthLayoutProps) {
  return Flex({
    viewportWidth,
    style: { 
      minHeight: "100vh",
      alignItems: "center", 
      justifyContent: "center" 
    },
    children: Box({
      viewportWidth,
      style: { 
        width: "100%", 
        maxWidth: "400px", 
        padding: "24px" 
      },
      children: Flex({
        viewportWidth,
        direction: "column",
        gap: 4,
        children: [
          logo ? Box({ viewportWidth, children: logo }) : null,
          subtitle ? Box({ viewportWidth, children: subtitle }) : null,
          children
        ].filter(Boolean)
      })
    })
  })
}