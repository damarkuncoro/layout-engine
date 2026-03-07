const assert = (cond: any, msg: string) => {
  if (!cond) {
    throw new Error(`Test failed: ${msg}`)
  }
}

declare const process: any

const run = async () => {
  const api = await import(new URL("../index.js", import.meta.url).href)
  const {
    SidebarLayout,
    DashboardLayout,
    renderToString,
    Box
  } = api

  const sidebar = Box({ children: "SIDE" })
  const content = Box({ children: "MAIN" })
  const header = Box({ children: "HEAD" })

  const node1 = SidebarLayout({ sidebar, children: content, sidebarWidth: 200 })
  const html1 = renderToString(node1 as any)
  assert(html1.includes("width:200px"), "Sidebar width applied")
  assert(html1.indexOf("SIDE") < html1.indexOf("MAIN"), "Sidebar before content")

  const node2 = DashboardLayout({ header, sidebar, children: content })
  const html2 = renderToString(node2 as any)
  assert(html2.indexOf("HEAD") < html2.indexOf("SIDE"), "Header before sidebar/content")
  console.log("Structures tests passed")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
