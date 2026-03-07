import React from "react"
import { SidebarLayout, SidebarLayoutAutoVW, HeaderContentFooter, Stack, Grid, Flex, Box, Container } from "@damarkuncoro/layout-engine-react"
import { resolveResponsive } from "@damarkuncoro/layout-engine"
import { Routes, Route, Link, useNavigate, useParams, useLocation } from "react-router-dom"

function Dashboard({ collapsed }) {
  const sidebarWidth = collapsed ? 80 : 240
  const header = React.createElement(
    "div",
    {
      style: {
        padding: 12,
        borderBottom: "1px solid #e5e5e5",
        background: "#fafafa"
      }
    },
    "Header ",
    collapsed ? "(Collapsed)" : "(Expanded)"
  )
  const sidebar = React.createElement(
    "div",
    { style: { padding: 12 } },
    collapsed ? "S" : "Sidebar"
  )
  const content = React.createElement(
    Stack,
    { gap: 16 },
    React.createElement("div", { key: "1", style: { padding: 12, border: "1px solid #ddd" } }, "Card 1"),
    React.createElement("div", { key: "2", style: { padding: 12, border: "1px solid #ddd" } }, "Card 2")
  )
  return React.createElement(
    "div",
    { style: { height: "100vh", display: "flex", flexDirection: "column" } },
    header,
    React.createElement(SidebarLayout, { sidebar: sidebar, children: content, sidebarWidth })
  )
}

function GridDemo() {
  return React.createElement(
    Grid,
    { columns: 3, gap: 16 },
    React.createElement("div", { key: "g1", style: { padding: 12, border: "1px solid #ddd" } }, "A"),
    React.createElement("div", { key: "g2", style: { padding: 12, border: "1px solid #ddd" } }, "B"),
    React.createElement("div", { key: "g3", style: { padding: 12, border: "1px solid #ddd" } }, "C"),
    React.createElement("div", { key: "g4", style: { padding: 12, border: "1px solid #ddd" } }, "D"),
    React.createElement("div", { key: "g5", style: { padding: 12, border: "1px solid #ddd" } }, "E"),
    React.createElement("div", { key: "g6", style: { padding: 12, border: "1px solid #ddd" } }, "F")
  )
}

export default function App() {
  const [view, setView] = React.useState("dashboard")
  const [collapsed, setCollapsed] = React.useState(false)
  const [dark, setDark] = React.useState(false)
  const [outline, setOutline] = React.useState(false)
  const navigate = useNavigate()
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  )
  const [simWidth, setSimWidth] = React.useState(null)
  const effectiveWidth = simWidth ?? width
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  const toolbar = React.createElement(
    "div",
    { style: { padding: 12, display: "flex", gap: 8, borderBottom: "1px dashed #ddd" } },
    React.createElement(
      "button",
      { onClick: () => setView("dashboard") },
      "Dashboard"
    ),
    React.createElement(
      "button",
      { onClick: () => { setView("router"); navigate("/router/overview") } },
      "Router"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("grid") },
      "Grid"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("responsive") },
      "Responsive"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("masonry") },
      "Masonry"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("areas") },
      "Areas"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("areas-resp") },
      "Areas Resp"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("hcf") },
      "HCF"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("rsb") },
      "Resp Sidebar"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("box") },
      "Box Responsive"
    ),
    React.createElement(
      "button",
      { onClick: () => setView("flex") },
      "Flex"
    ),
    view === "dashboard" &&
      React.createElement(
        "button",
        { onClick: () => setCollapsed((c) => !c) },
        collapsed ? "Expand Sidebar" : "Collapse Sidebar"
      ),
    React.createElement(
      "button",
      { onClick: () => setDark((d) => !d) },
      dark ? "Light Mode" : "Dark Mode"
    ),
    React.createElement(
      "button",
      { onClick: () => setOutline((o) => !o) },
      outline ? "Outline Off" : "Outline On"
    ),
    React.createElement(
      "span",
      { style: { marginLeft: "auto", fontSize: 12, color: "#666" } },
      `vw: ${effectiveWidth}px`
    ),
    React.createElement(
      "button",
      { onClick: () => setSimWidth(640) },
      "sm 640"
    ),
    React.createElement(
      "button",
      { onClick: () => setSimWidth(768) },
      "md 768"
    ),
    React.createElement(
      "button",
      { onClick: () => setSimWidth(1024) },
      "lg 1024"
    ),
    React.createElement(
      "button",
      { onClick: () => setSimWidth(null) },
      "reset vw"
    )
  )
  const ResponsiveDemo = () => {
    const gap = resolveResponsive({ base: 8, md: 16, xl: 24 }, effectiveWidth)
    const cols = effectiveWidth < 640 ? 2 : effectiveWidth < 1024 ? 3 : 4
    return React.createElement(
      "div",
      { style: { padding: 12 } },
      React.createElement("div", { style: { marginBottom: 8, color: "#555" } }, `Width: ${effectiveWidth}px, gap: ${gap}, cols: ${cols}`),
      React.createElement(
        Grid,
        { columns: cols, gap },
        React.createElement("div", { key: "r1", style: { padding: 12, border: "1px solid #ddd" } }, "1"),
        React.createElement("div", { key: "r2", style: { padding: 12, border: "1px solid #ddd" } }, "2"),
        React.createElement("div", { key: "r3", style: { padding: 12, border: "1px solid #ddd" } }, "3"),
        React.createElement("div", { key: "r4", style: { padding: 12, border: "1px solid #ddd" } }, "4"),
        React.createElement("div", { key: "r5", style: { padding: 12, border: "1px solid #ddd" } }, "5"),
        React.createElement("div", { key: "r6", style: { padding: 12, border: "1px solid #ddd" } }, "6")
      )
    )
  }
  const MasonryDemo = () => {
    return React.createElement(
      "div",
      { style: { padding: 12 } },
      React.createElement(
        Grid,
        { columns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 },
        React.createElement("div", { key: "m1", style: { padding: 12, border: "1px solid #ddd", height: 60 } }, "A"),
        React.createElement("div", { key: "m2", style: { padding: 12, border: "1px solid #ddd", height: 120 } }, "B"),
        React.createElement("div", { key: "m3", style: { padding: 12, border: "1px solid #ddd", height: 80 } }, "C"),
        React.createElement("div", { key: "m4", style: { padding: 12, border: "1px solid #ddd", height: 160 } }, "D"),
        React.createElement("div", { key: "m5", style: { padding: 12, border: "1px solid #ddd", height: 100 } }, "E"),
        React.createElement("div", { key: "m6", style: { padding: 12, border: "1px solid #ddd", height: 140 } }, "F")
      )
    )
  }
  const AreasDemo = () => {
    return React.createElement(
      "div",
      { style: { padding: 12 } },
      React.createElement(
        Grid,
        {
          columns: "200px 1fr",
          rows: "auto 1fr",
          gap: 8,
          style: { gridTemplateAreas: `"hd hd" "sd ct"` }
        },
        React.createElement("div", { key: "a-hd", style: { gridArea: "hd", padding: 12, border: "1px solid #ddd" } }, "Header"),
        React.createElement("div", { key: "a-sd", style: { gridArea: "sd", padding: 12, border: "1px solid #ddd" } }, "Sidebar"),
        React.createElement("div", { key: "a-ct", style: { gridArea: "ct", padding: 12, border: "1px solid #ddd" } }, "Content")
      )
    )
  }
  const AreasResponsiveDemo = () => {
    const areas = effectiveWidth < 768 ? `"hd" "sd" "ct"` : `"hd hd" "sd ct"`
    const cols = effectiveWidth < 768 ? "1fr" : "200px 1fr"
    const rows = effectiveWidth < 768 ? "auto auto 1fr" : "auto 1fr"
    return React.createElement(
      Container,
      null,
      React.createElement(Grid, { columns: cols, rows, gap: 8, style: { gridTemplateAreas: areas } },
        React.createElement("div", { key: "ar-hd", style: { gridArea: "hd", padding: 12, border: "1px solid #ddd" } }, "Header"),
        React.createElement("div", { key: "ar-sd", style: { gridArea: "sd", padding: 12, border: "1px solid #ddd" } }, "Sidebar"),
        React.createElement("div", { key: "ar-ct", style: { gridArea: "ct", padding: 12, border: "1px solid #ddd" } }, "Content"))
    )
  }
  const ResponsiveSidebarDemo = () => {
    const [override, setOverride] = React.useState(null)
    const sw = override ?? { base: 120, md: 200, xl: 280 }
    const sidebar = React.createElement("div", { style: { padding: 12 } }, `Sidebar ${sw}px`)
    const content = React.createElement(
      Stack,
      { gap: 8 },
      React.createElement("div", { key: "rs1", style: { padding: 12, border: "1px solid #ddd" } }, "Item 1"),
      React.createElement("div", { key: "rs2", style: { padding: 12, border: "1px solid #ddd" } }, "Item 2")
    )
    return React.createElement(
      "div",
      { style: { padding: 12 } },
      React.createElement(
        "div",
        { style: { marginBottom: 8, color: "#555" } },
        `sidebarWidth: ${typeof sw === "number" ? sw + "px" : "{ base:120, md:200, xl:280 }"}`
      ),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
        React.createElement("input", {
          type: "range",
          min: 80,
          max: 320,
          value: typeof sw === "number" ? sw : 200,
          onChange: (e) => setOverride(+e.target.value)
        }),
        React.createElement(
          "button",
          { onClick: () => setOverride(null) },
          "reset"
        )
      ),
      React.createElement(SidebarLayoutAutoVW, { sidebar, children: content, sidebarWidth: sw })
    )
  }
  const BoxResponsiveDemo = () => {
    const pad = resolveResponsive({ base: 8, md: 16, xl: 24 }, effectiveWidth)
    const mar = resolveResponsive({ base: 8, md: 16, xl: 24 }, effectiveWidth)
    return React.createElement(
      "div",
      { style: { padding: 12 } },
      React.createElement(
        "div",
        { style: { marginBottom: 8, color: "#555" } },
        `Width: ${effectiveWidth}px → padding: ${pad}px, margin: ${mar}px`
      ),
      React.createElement(
        Box,
        { padding: pad, margin: mar, style: { border: "1px solid #ddd" } },
        React.createElement("div", null, "Responsive Box")
      )
    )
  }
  const content =
    view === "dashboard"
      ? React.createElement(Dashboard, { collapsed })
      : view === "grid"
      ? React.createElement("div", { style: { padding: 12 } }, React.createElement(GridDemo))
      : view === "responsive"
      ? React.createElement(ResponsiveDemo)
      : view === "masonry"
      ? React.createElement(MasonryDemo)
      : view === "areas"
      ? React.createElement(AreasDemo)
      : view === "areas-resp"
      ? React.createElement(AreasResponsiveDemo)
      : view === "rsb"
      ? React.createElement(ResponsiveSidebarDemo)
      : view === "box"
      ? React.createElement(BoxResponsiveDemo)
      : view === "hcf"
      ? React.createElement(
          Container,
          null,
          React.createElement(HeaderContentFooter, {
            header: React.createElement("div", { style: { padding: 12, borderBottom: "1px solid #e5e5e5" } }, "Header"),
            content: React.createElement(
              Stack,
              { gap: 12 },
              React.createElement("div", { key: "hc1", style: { padding: 12, border: "1px solid #ddd" } }, "Content A"),
              React.createElement("div", { key: "hc2", style: { padding: 12, border: "1px solid #ddd" } }, "Content B")
            ),
            footer: React.createElement("div", { style: { padding: 12, borderTop: "1px solid #e5e5e5" } }, "Footer")
          })
        )
      : view === "router"
      ? React.createElement(RouterDemo)
      : React.createElement(
          "div",
          { style: { padding: 12 } },
          React.createElement(
            "div",
            { style: { marginBottom: 8, color: "#555" } },
            "Flex demo: toggle direction and gap"
          ),
          React.createElement(FlexDemo)
        )
  const bg = dark ? "#0f172a" : "#fff"
  const fg = dark ? "#e2e8f0" : "#111"
  const outlineCss = outline
    ? `.preview *{outline:1px dashed ${dark ? "#334155" : "#94a3b8"}}`
    : ""
  return React.createElement(
    "div",
    { style: { background: bg, color: fg, minHeight: "100vh" } },
    toolbar,
    React.createElement("style", null, outlineCss),
    React.createElement("div", { className: "preview" }, content)
  )
}

function FlexDemo() {
  const [direction, setDirection] = React.useState("row")
  const [gap, setGap] = React.useState(12)
  const controls = React.createElement(
    "div",
    { style: { display: "flex", gap: 8, marginBottom: 8 } },
    React.createElement(
      "select",
      {
        value: direction,
        onChange: (e) => setDirection(e.target.value)
      },
      React.createElement("option", { value: "row" }, "row"),
      React.createElement("option", { value: "column" }, "column")
    ),
    React.createElement(
      "input",
      {
        type: "range",
        min: 0,
        max: 32,
        value: gap,
        onChange: (e) => setGap(+e.target.value)
      }
    ),
    React.createElement("span", null, `gap: ${gap}px`)
  )
  return React.createElement(
    "div",
    null,
    controls,
    React.createElement(
      Flex,
      { direction, gap },
      React.createElement("div", { key: "f1", style: { border: "1px solid #ddd", padding: 12 } }, "Item 1"),
      React.createElement("div", { key: "f2", style: { border: "1px solid #ddd", padding: 12 } }, "Item 2"),
      React.createElement("div", { key: "f3", style: { border: "1px solid #ddd", padding: 12 } }, "Item 3")
    )
  )
}

function RouterDemo() {
  const sidebar = React.createElement(
    Stack,
    { gap: 8 },
    React.createElement(Link, { key: "r-ov", to: "/router/overview" }, "Overview"),
    React.createElement(Link, { key: "r-ov-an", to: "/router/overview/analytics" }, "Overview: Analytics"),
    React.createElement(Link, { key: "r-ov-re", to: "/router/overview/reports" }, "Overview: Reports"),
    React.createElement(Link, { key: "r-st", to: "/router/settings/general" }, "Settings")
  )
  const header = React.createElement("div", { style: { padding: 12, borderBottom: "1px solid #e5e5e5" } }, "Router Demo")
  const OverviewDefault = () => React.createElement("div", { style: { padding: 12 } }, "Overview Content")
  const OverviewSection = () => {
    const p = useParams()
    return React.createElement("div", { style: { padding: 12 } }, `Overview Section: ${p.section}`)
  }
  const SettingsGeneral = () => React.createElement("div", { style: { padding: 12 } }, "Settings: General")
  const SettingsAppearance = () => React.createElement("div", { style: { padding: 12 } }, "Settings: Appearance")
  const SettingsAccount = () => React.createElement("div", { style: { padding: 12 } }, "Settings: Account")
  const SettingsLayout = () => {
    const tabs = React.createElement(
      Stack,
      { gap: 8 },
      React.createElement(Link, { key: "s-gn", to: "/router/settings/general" }, "General"),
      React.createElement(Link, { key: "s-ap", to: "/router/settings/appearance" }, "Appearance"),
      React.createElement(Link, { key: "s-ac", to: "/router/settings/account" }, "Account")
    )
    const nested = React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "general", element: React.createElement(SettingsGeneral) }),
      React.createElement(Route, { path: "appearance", element: React.createElement(SettingsAppearance) }),
      React.createElement(Route, { path: "account", element: React.createElement(SettingsAccount) }),
      React.createElement(Route, { path: "*", element: React.createElement(SettingsGeneral) })
    )
    return React.createElement(SidebarLayout, { sidebar: tabs, children: nested, sidebarWidth: 160 })
  }
  const Breadcrumbs = () => {
    const loc = useLocation()
    const segs = loc.pathname.split("/").filter(Boolean)
    return React.createElement(
      "div",
      { style: { padding: "8px 12px", fontSize: 12, color: "#555", borderBottom: "1px dashed #e5e5e5" } },
      segs.join(" / ")
    )
  }
  const routes = React.createElement(
    Routes,
    null,
    React.createElement(Route, { path: "/router/overview", element: React.createElement(OverviewDefault) }),
    React.createElement(Route, { path: "/router/overview/:section", element: React.createElement(OverviewSection) }),
    React.createElement(Route, { path: "/router/settings/*", element: React.createElement(SettingsLayout) })
  )
  return React.createElement(
    "div",
    { style: { height: "calc(100vh - 56px)", display: "flex", flexDirection: "column" } },
    header,
    React.createElement(Breadcrumbs),
    React.createElement(SidebarLayoutAutoVW, { sidebar, children: routes, sidebarWidth: { base: 140, md: 180, lg: 220 } })
  )
}
