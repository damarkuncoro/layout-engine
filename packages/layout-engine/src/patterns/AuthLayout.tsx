import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { NodeLike } from "../system/contracts.js"

export interface AuthLayoutProps {
  children: NodeLike
  logo?: NodeLike
  subtitle?: string
}

/**
 * AuthLayout - layout untuk halaman login/register
 * Konsisten centered dengan form di tengah layar
 */
export function AuthLayout({
  children,
  logo,
  subtitle
}: AuthLayoutProps) {
  return Flex({
    style: { 
      minHeight: "100vh",
      alignItems: "center", 
      justifyContent: "center" 
    },
    children: Box({
      style: { 
        width: "100%", 
        maxWidth: "400px", 
        padding: "24px" 
      },
      children: Flex({
        direction: "column",
        gap: 4,
        children: [
          logo ? Box({ children: logo }) : null,
          subtitle ? Box({ children: subtitle }) : null,
          children
        ].filter(Boolean)
      })
    })
  })
}