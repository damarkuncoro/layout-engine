import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import type { HeaderLayoutContract } from "../system/contracts.js"

export interface HeaderLayoutProps extends HeaderLayoutContract {
  headerHeight?: string | number
}

/**
 * HeaderLayout - layout dengan header di atas dan content di bawah
 */
export function HeaderLayout({
  header,
  children,
  headerHeight = 64
}: HeaderLayoutProps) {
  return Flex({
    direction: "column",
    children: [
      Box({ 
        height: headerHeight, 
        style: { position: "sticky", top: 0, zIndex: 10 },
        children: header 
      }),
      Box({
        style: { flex: 1 },
        children
      })
    ]
  })
}