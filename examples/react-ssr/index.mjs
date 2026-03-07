import React from "react"
import { renderToString } from "react-dom/server"
import { DashboardLayout, Stack } from "layout-engine-react"

function Page() {
  return React.createElement(
    DashboardLayout,
    {
      header: React.createElement("div", null, "Header"),
      sidebar: React.createElement("div", null, "Sidebar")
    },
    React.createElement(
      Stack,
      { gap: 16 },
      React.createElement("div", { key: "1" }, "Card 1"),
      React.createElement("div", { key: "2" }, "Card 2")
    )
  )
}

const html = renderToString(React.createElement(Page))
console.log(html)
