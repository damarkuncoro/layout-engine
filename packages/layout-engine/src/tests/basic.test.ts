const assert = (cond: any, msg: string) => {
  if (!cond) {
    throw new Error(`Test failed: ${msg}`)
  }
}

declare const process: any

const run = async () => {
  const api = await import(new URL("../index.js", import.meta.url).href)
  const {
    normalizeUnit,
    space,
    resolveResponsive,
    Flex,
    Box,
    renderToString
  } = api

  // normalizeUnit
  assert(normalizeUnit(16) === "16px", "normalizeUnit number to px")
  assert(normalizeUnit("2rem") === "2rem", "normalizeUnit keeps string")

  // spacing tokens
  assert(space(2) === "8px", "spacing index 2 is 8px")

  // responsive resolver (object form)
  assert(
    resolveResponsive({ base: 8, md: 16, xl: 24 }, 800) === 16,
    "resolveResponsive picks md at width 800"
  )
  assert(
    resolveResponsive({ base: 8, md: 16, xl: 24 }, 1300) === 24,
    "resolveResponsive picks xl at width 1300"
  )

  // primitives mapping + render
  const node = Flex({
    direction: "row",
    gap: 16,
    children: [
      Box({ width: 240, children: "Sidebar" }),
      Box({ style: { flex: 1 }, children: "Content" })
    ]
  })

  const html = renderToString(node as any)
  assert(html.includes("display:flex"), "Flex renders display flex")
  assert(html.includes("flex-direction:row"), "Flex renders direction")
  assert(html.includes("gap:16px"), "Flex renders gap 16px")
  assert(html.includes("width:240px"), "Box width 240px")
  assert(html.includes("flex:1"), "Box flex:1 in style")

  console.log("All tests passed")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
