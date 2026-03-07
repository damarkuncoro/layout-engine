import { Box } from "../primitives/Box.js"
import { Flex } from "../primitives/Flex.js"
import { SidebarLayout } from "../structures/SidebarLayout.js"
import type { DashboardLayoutContract } from "../system/contracts.js"

export function DashboardLayout({
  header,
  sidebar,
  children
}: DashboardLayoutContract) {
  return Flex({
    direction: "column",
    children: [
      header,
      SidebarLayout({ sidebar, children })
    ]
  })
}
