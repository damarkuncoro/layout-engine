import { Flex } from "../primitives/Flex.js"
import type { NodeLike } from "../system/contracts.js"

export interface HeaderContentFooterContract {
  header: NodeLike
  content: NodeLike
  footer: NodeLike
}

export function HeaderContentFooter({
  header,
  content,
  footer
}: HeaderContentFooterContract) {
  return Flex({
    direction: "column",
    children: [header, content, footer]
  })
}
