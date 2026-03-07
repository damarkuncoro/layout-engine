import React from "react"
import { renderToString } from "react-dom/server"
import { SidebarLayout, Stack, Grid, Box } from "@damarkuncoro/layout-engine-react"
import {
  renderToString as renderHeadlessToString,
  SidebarLayout as HSidebarLayout,
  Stack as HStack,
  Box as HBox,
  Grid as HGrid
} from "@damarkuncoro/layout-engine"

function Page({ viewportWidth = 1024 }) {
  const sidebar = React.createElement("div", null, "Sidebar")
  const content = React.createElement(
    Stack,
    { gap: 16 },
    React.createElement("div", { key: "1" }, "Card 1"),
    React.createElement("div", { key: "2" }, "Card 2")
  )
  return React.createElement(SidebarLayout, { sidebar, children: content, sidebarWidth: { base: 120, md: 200, xl: 280 }, viewportWidth })
}

const vwSmall = 640
const vwLarge = 1280
const htmlSmall = renderToString(React.createElement(Page, { viewportWidth: vwSmall }))
const htmlLarge = renderToString(React.createElement(Page, { viewportWidth: vwLarge }))

const headlessSmall = renderHeadlessToString(
  HSidebarLayout({
    sidebar: HBox({ children: "Sidebar" }),
    children: HStack({ gap: 16, children: [HBox({ children: "Card 1" }), HBox({ children: "Card 2" })] }),
    sidebarWidth: { base: 120, md: 200, xl: 280 },
    viewportWidth: vwSmall
  })
)
const headlessLarge = renderHeadlessToString(
  HSidebarLayout({
    sidebar: HBox({ children: "Sidebar" }),
    children: HStack({ gap: 16, children: [HBox({ children: "Card 1" }), HBox({ children: "Card 2" })] }),
    sidebarWidth: { base: 120, md: 200, xl: 280 },
    viewportWidth: vwLarge
  })
)

const eq640 = htmlSmall.replace(/\s+/g, "") === headlessSmall.replace(/\s+/g, "")
const eq1280 = htmlLarge.replace(/\s+/g, "") === headlessLarge.replace(/\s+/g, "")

const reactGrid = renderToString(
  React.createElement(
    Grid,
    { columns: 3, gap: 16 },
    React.createElement("div", { key: "g1" }, "A"),
    React.createElement("div", { key: "g2" }, "B"),
    React.createElement("div", { key: "g3" }, "C")
  )
)
const headlessGrid = renderHeadlessToString(
  HGrid({
    columns: 3,
    gap: 16,
    children: [HBox({ children: "A" }), HBox({ children: "B" }), HBox({ children: "C" })]
  })
)
const eqGrid = reactGrid.replace(/\s+/g, "") === headlessGrid.replace(/\s+/g, "")
console.log("--- React SSR layout viewport 640 ---")
console.log(htmlSmall)
console.log("--- Headless layout viewport 640 ---")
console.log(headlessSmall)
console.log("--- React SSR layout viewport 1280 ---")
console.log(htmlLarge)
console.log("--- Headless layout viewport 1280 ---")
console.log(headlessLarge)
console.log("Equal (640):", eq640)
console.log("Equal (1280):", eq1280)
console.log("--- React SSR grid ---")
console.log(reactGrid)
console.log("--- Headless grid ---")
console.log(headlessGrid)
console.log("Equal (Grid):", eqGrid)
if (!eq640 || !eq1280 || !eqGrid) {
  console.error("Mismatch between React SSR and headless render")
  process.exit(1)
}
