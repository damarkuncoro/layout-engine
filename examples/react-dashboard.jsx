import React from "react"
import { renderToString } from "react-dom/server"
import { DashboardLayout, Stack } from "../packages/layout-engine-react/dist/index.js"

function Page() {
  return (
    <DashboardLayout
      header={<div>Header</div>}
      sidebar={<div>Sidebar</div>}
    >
      <Stack gap={16}>
        <div>Card 1</div>
        <div>Card 2</div>
      </Stack>
    </DashboardLayout>
  )
}

const html = renderToString(<Page />)
console.log(html)
