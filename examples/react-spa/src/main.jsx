import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { BreakpointsProvider } from "@damarkuncoro/layout-engine-react"

createRoot(document.getElementById("root")).render(
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      BreakpointsProvider,
      { initialWidth: typeof window !== "undefined" ? window.innerWidth : 1024 },
      React.createElement(App)
    )
  )
)
