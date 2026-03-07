import { Flex } from "./Flex.js"
import type { LayoutProps } from "../system/types.js"
export function Center(props: LayoutProps & { children?: any }) {
  return Flex({ justify: "center", align: "center", ...props })
}
