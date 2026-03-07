import { DashboardLayout, Box, renderToString } from "../packages/layout-engine/dist/index.js"

const header = Box({ children: "Header" })
const sidebar = Box({ children: "Sidebar" })
const content = Box({ children: "Content" })

const node = DashboardLayout({
  header,
  sidebar,
  children: content
})

const html = renderToString(node)
console.log(html)
