import { Flex, Box, renderToString } from "../packages/layout-engine/dist/index.js"

const node = Flex({
  direction: "row",
  gap: 16,
  children: [
    Box({ width: 200, children: "Sidebar" }),
    Box({ style: { flex: 1 }, children: "Content" })
  ]
})

const html = renderToString(node)
console.log(html)
