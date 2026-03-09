import { Box, Flex, Stack, Container, Grid, normalizeUnit, breakpoints } from "@damarkuncoro/layout-engine"
import type { 
  HeroProps, 
  HeroTitleProps, 
  HeroDescriptionProps, 
  HeroActionsProps, 
  HeroVisualProps, 
  HeroBackgroundProps,
  HeroStatsProps,
  HeroFormProps,
  HeroGridProps
} from "../contracts.js"

// --- Sub-components ---

export function HeroTitle({ children, tag = "h1", style }: HeroTitleProps) {
  return Box({
    tag,
    style: {
      fontSize: "3rem",
      fontWeight: 800,
      lineHeight: 1.2,
      margin: 0,
      ...style
    },
    children
  })
}

export function HeroDescription({ children, style }: HeroDescriptionProps) {
  return Box({
    tag: "p",
    style: {
      fontSize: "1.25rem",
      lineHeight: 1.6,
      opacity: 0.8,
      margin: 0,
      ...style
    },
    children
  })
}

export function HeroActions({ items, justify = "flex-start", style }: HeroActionsProps) {
  return Flex({
    gap: "16px",
    justify,
    style: { flexWrap: "wrap", ...style },
    children: items.map((action, idx) =>
      Box({
        tag: action.href ? "a" : "button",
        type: action.href ? undefined : "button",
        key: action.id || idx,
        href: action.href,
        onClick: action.onClick,
        style: {
          padding: "12px 24px",
          fontWeight: 600,
          borderRadius: "8px",
          cursor: "pointer",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          ...(action.variant === "primary" ? {
            backgroundColor: "#000",
            color: "#fff",
            border: "none"
          } : {
            backgroundColor: "transparent",
            color: "inherit",
            border: "1px solid currentColor"
          })
        },
        children: [
          action.icon ? Box({ children: action.icon }) : null,
          action.label
        ].filter(Boolean)
      } as any)
    )
  })
}

export function HeroVisual({ children, style }: HeroVisualProps) {
  return Box({
    style: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      ...style
    },
    children
  })
}

export function HeroBackground({ image, video, overlay, style }: HeroBackgroundProps) {
  return Box({
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      ...style
    },
    children: [
      video ? Box({
        tag: "video",
        src: video,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        style: { width: "100%", height: "100%", objectFit: "cover" }
      }) : (image ? Box({
        tag: "img",
        src: image,
        style: { width: "100%", height: "100%", objectFit: "cover" }
      }) : null),
      overlay ? Box({
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: typeof overlay === "number" ? `rgba(0,0,0,${overlay})` : overlay,
          zIndex: 1
        }
      }) : null
    ].filter(Boolean)
  })
}

export function HeroStats({ items, style }: HeroStatsProps) {
  return Flex({
    gap: "32px",
    style: { flexWrap: "wrap", ...style },
    children: items.map((stat, idx) => 
      Stack({
        gap: "4px",
        ...({ key: idx } as any),
        children: [
          Box({ style: { fontSize: "1.5rem", fontWeight: 700 }, children: stat.value }),
          Box({ style: { fontSize: "0.875rem", opacity: 0.6 }, children: stat.label })
        ]
      })
    )
  })
}

export function HeroForm({ children, onSubmit, style }: HeroFormProps) {
  return Box({
    tag: "form",
    onSubmit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      width: "100%",
      maxWidth: "400px",
      ...style
    },
    children
  })
}

export function HeroGrid({ children, columns = 3, gap = "24px", style }: HeroGridProps) {
  return Grid({
    columns,
    gap,
    style: { width: "100%", ...style },
    children
  })
}

// --- Main Hero Component ---

export function Hero(props: HeroProps) {
  const {
    pattern = "split",
    title,
    description,
    actions = [],
    visual,
    stats = [],
    form,
    video,
    height,
    minHeight = "600px",
    maxHeight,
    background,
    paddingY = "80px",
    paddingX = "24px",
    viewportWidth,
    collapseAt = "md",
    reverse = false,
    visualOverlay,
    style,
    children
  } = props

  // Compositional mode
  if (children) {
    return Box({
      tag: "section",
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: normalizeUnit(minHeight as any),
        height: normalizeUnit(height as any),
        ...style
      },
      children
    })
  }

  const threshold =
    typeof collapseAt === "number"
      ? collapseAt
      : (breakpoints as Record<string, number>)[collapseAt ?? "md"] ?? (breakpoints as Record<string, number>).md
  const isCollapsed = typeof viewportWidth === "number" ? viewportWidth < threshold : false

  const visualContent = (v: any) => {
    if (!v) return null
    if (typeof v === "string") {
      return Box({ tag: "img", src: v, style: { width: "100%", height: "100%", objectFit: "cover" } })
    }
    return v
  }

  const content = Stack({
    gap: "24px",
    style: { flex: 1, textAlign: pattern === "centered" ? "center" : "left" },
    children: [
      title ? (typeof title === "string" ? HeroTitle({ children: title }) : title) : null,
      description ? (typeof description === "string" ? HeroDescription({ children: description }) : description) : null,
      actions.length > 0 ? HeroActions({ items: actions, justify: pattern === "centered" ? "center" : "flex-start" }) : null,
      stats.length > 0 ? HeroStats({ items: stats, style: { marginTop: "16px", justifyContent: pattern === "centered" ? "center" : "flex-start" } }) : null,
      form ? Box({ children: form }) : null
    ].filter(Boolean)
  })

  const visualRendered = visualContent(visual)
  const visualPart = visualRendered ? HeroVisual({ children: visualRendered }) : null

  const rootStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: normalizeUnit(minHeight as any),
    height: normalizeUnit(height as any),
    maxHeight: normalizeUnit(maxHeight as any),
    backgroundColor: background,
    paddingTop: pattern === "fullscreen" ? "0" : normalizeUnit(paddingY as any),
    paddingBottom: pattern === "fullscreen" ? "0" : normalizeUnit(paddingY as any),
    paddingLeft: normalizeUnit(paddingX as any),
    paddingRight: normalizeUnit(paddingX as any),
    ...style
  }

  // Pola Rendering
  if (pattern === "centered") {
    return Box({
      tag: "section",
      style: rootStyle,
      children: Container({
        children: Flex({
          direction: "column",
          gap: "40px",
          align: "center",
          children: [content, visualPart].filter(Boolean)
        })
      })
    })
  }

  if (pattern === "fullscreen") {
    return Box({
      tag: "section",
      style: {
        ...rootStyle,
        height: height || "100vh",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      },
      children: [
        (visual || background || video) ? HeroBackground({ 
          image: typeof visual === "string" ? visual : (typeof background === "string" ? background : undefined),
          video,
          overlay: visualOverlay
        }) : null,
        Box({
          style: { position: "relative", zIndex: 2, width: "100%" },
          children: Container({
            children: content
          })
        })
      ].filter(Boolean)
    })
  }

  if (pattern === "overlap") {
    return Box({
      tag: "section",
      style: rootStyle,
      children: Container({
        children: Flex({
          direction: "column",
          style: { position: "relative" },
          children: [
            visualRendered ? Box({
              style: {
                width: "100%",
                height: isCollapsed ? "250px" : "400px",
                borderRadius: "16px",
                overflow: "hidden"
              },
              children: visualRendered
            }) : null,
            Box({
              style: {
                marginTop: isCollapsed ? "-40px" : "-100px",
                marginLeft: isCollapsed ? "12px" : "40px",
                marginRight: isCollapsed ? "12px" : "40px",
                backgroundColor: background || "#fff",
                padding: isCollapsed ? "24px" : "40px",
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                position: "relative",
                zIndex: 2
              },
              children: content
            })
          ].filter(Boolean)
        })
      })
    })
  }

  if (pattern === "minimal") {
    return Box({
      tag: "section",
      style: { ...rootStyle, minHeight: "auto", paddingY: "60px" },
      children: Container({
        children: content
      })
    })
  }

  // Default Split Layout
  return Box({
    tag: "section",
    style: rootStyle,
    children: Container({
      children: Flex({
        direction: isCollapsed ? "column" : (reverse ? "row-reverse" : "row"),
        align: "center",
        gap: "40px",
        children: [content, visualPart].filter(Boolean)
      })
    })
  })
}

// Attach sub-components to Hero for namespaced usage: Hero.Title, etc.
Hero.Title = HeroTitle
Hero.Description = HeroDescription
Hero.Actions = HeroActions
Hero.Visual = HeroVisual
Hero.Background = HeroBackground
Hero.Stats = HeroStats
Hero.Form = HeroForm
Hero.Grid = HeroGrid
