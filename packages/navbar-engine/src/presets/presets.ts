/**
 * Layout Presets - Pre-built layouts yang siap pakai
 */

import { Flex } from "../primitives/Flex.js"
import { Box } from "../primitives/Box.js"
import { Grid } from "../primitives/Grid.js"
import { Container } from "../primitives/Container.js"
import type { NodeLike } from "../system/contracts.js"

// ============================================================================
// Blog Preset
// ============================================================================

export interface BlogPostPresetProps {
  title: NodeLike
  meta: NodeLike
  content: NodeLike
  sidebar?: NodeLike
  maxWidth?: number
}

export function BlogPostPreset({
  title,
  meta,
  content,
  sidebar,
  maxWidth = 800
}: BlogPostPresetProps) {
  if (sidebar) {
    return Flex({
      gap: 6,
      children: [
        Box({
          width: maxWidth,
          children: Flex({
            direction: "column",
            gap: 4,
            children: [
              Box({ children: title }),
              Box({ children: meta }),
              Box({ children: content })
            ]
          })
        }),
        Box({
          style: { width: "300px", flexShrink: 0 },
          children: sidebar
        })
      ]
    })
  }
  
  return Container({
    maxWidth,
    children: Flex({
      direction: "column",
      gap: 4,
      children: [
        Box({ children: title }),
        Box({ children: meta }),
        Box({ children: content })
      ]
    })
  })
}

export interface BlogListPresetProps {
  posts: NodeLike[]
  sidebar?: NodeLike
  columns?: number
}

export function BlogListPreset({
  posts,
  sidebar,
  columns = 2
}: BlogListPresetProps) {
  return Flex({
    gap: 6,
    children: [
      Grid({
        columns,
        gap: 4,
        children: posts
      }),
      sidebar ? Box({
        style: { width: "280px", flexShrink: 0 },
        children: sidebar
      }) : null
    ].filter(Boolean)
  })
}

// ============================================================================
// E-commerce Preset
// ============================================================================

export interface ProductGridPresetProps {
  products: NodeLike[]
  columns?: number
}

export function ProductGridPreset({
  products,
  columns = 3
}: ProductGridPresetProps) {
  return Grid({
    columns,
    gap: 4,
    children: products
  })
}

export interface ProductDetailPresetProps {
  image: NodeLike
  title: NodeLike
  price: NodeLike
  description: NodeLike
  actions: NodeLike
  specs?: NodeLike
}

export function ProductDetailPreset({
  image,
  title,
  price,
  description,
  actions,
  specs
}: ProductDetailPresetProps) {
  return Flex({
    gap: 6,
    children: [
      Box({
        style: { flex: "0 0 50%" },
        children: image
      }),
      Box({
        children: Flex({
          direction: "column",
          gap: 4,
          children: [
            Box({ children: title }),
            Box({ children: price }),
            Box({ children: description }),
            Box({ children: actions }),
            specs ? Box({ children: specs }) : null
          ].filter(Boolean)
        })
      })
    ]
  })
}

export interface CartPresetProps {
  items: NodeLike
  summary: NodeLike
}

export function CartPreset({ items, summary }: CartPresetProps) {
  return Flex({
    gap: 6,
    children: [
      Box({
        style: { flex: 1 },
        children: items
      }),
      Box({
        style: { width: "320px", flexShrink: 0 },
        children: summary
      })
    ]
  })
}

// ============================================================================
// Dashboard Preset
// ============================================================================

export interface StatsGridPresetProps {
  stats: NodeLike[]
  columns?: number
}

export function StatsGridPreset({
  stats,
  columns = 4
}: StatsGridPresetProps) {
  return Grid({
    columns,
    gap: 4,
    children: stats
  })
}

export interface DataTablePresetProps {
  headers: NodeLike
  rows: NodeLike[]
  pagination?: NodeLike
}

export function DataTablePreset({
  headers,
  rows,
  pagination
}: DataTablePresetProps) {
  return Flex({
    direction: "column",
    gap: 4,
    children: [
      Box({
        style: { overflowX: "auto" },
        children: Flex({
          direction: "column",
          children: [
            Box({ children: headers }),
            ...rows,
            pagination ? Box({ children: pagination }) : null
          ].filter(Boolean)
        })
      })
    ]
  })
}

export interface DashboardWidgetPresetProps {
  title: NodeLike
  content: NodeLike
  action?: NodeLike
}

export function DashboardWidgetPreset({
  title,
  content,
  action
}: DashboardWidgetPresetProps) {
  return Box({
    children: Flex({
      direction: "column",
      gap: 3,
      children: [
        Flex({
          justify: "space-between",
          align: "center",
          children: [
            Box({ children: title }),
            action ? Box({ children: action }) : null
          ].filter(Boolean)
        }),
        Box({ children: content })
      ]
    })
  })
}

// ============================================================================
// Settings Preset
// ============================================================================

export interface SettingsPagePresetProps {
  sidebar: NodeLike
  content: NodeLike
}

export function SettingsPagePreset({ sidebar, content }: SettingsPagePresetProps) {
  return Flex({
    gap: 6,
    children: [
      Box({
        style: { width: "250px", flexShrink: 0 },
        children: sidebar
      }),
      Box({
        style: { flex: 1 },
        children: content
      })
    ]
  })
}

export interface SettingsSectionPresetProps {
  title: NodeLike
  description?: NodeLike
  children: NodeLike
}

export function SettingsSectionPreset({
  title,
  description,
  children
}: SettingsSectionPresetProps) {
  return Flex({
    direction: "column",
    gap: 4,
    children: [
      Box({ children: title }),
      description ? Box({ children: description }) : null,
      Box({ children: children })
    ].filter(Boolean)
  })
}

// ============================================================================
// Documentation Preset
// ============================================================================

export interface DocsPagePresetProps {
  nav: NodeLike
  content: NodeLike
  toc?: NodeLike
}

export function DocsPagePreset({ nav, content, toc }: DocsPagePresetProps) {
  return Flex({
    gap: 6,
    children: [
      Box({
        style: { width: "240px", flexShrink: 0 },
        children: nav
      }),
      Box({
        style: { flex: 1, minWidth: 0 },
        children: content
      }),
      toc ? Box({
        style: { width: "200px", flexShrink: 0 },
        children: toc
      }) : null
    ].filter(Boolean)
  })
}

export interface DocsSidebarPresetProps {
  sections: NodeLike[]
}

export function DocsSidebarPreset({ sections }: DocsSidebarPresetProps) {
  return Flex({
    direction: "column",
    gap: 3,
    children: sections
  })
}

// ============================================================================
// Profile Preset
// ============================================================================

export interface ProfilePagePresetProps {
  header: NodeLike
  tabs: NodeLike
  content: NodeLike
}

export function ProfilePagePreset({ header, tabs, content }: ProfilePagePresetProps) {
  return Flex({
    direction: "column",
    gap: 4,
    children: [
      Box({ children: header }),
      Box({ children: tabs }),
      Box({ children: content })
    ]
  })
}