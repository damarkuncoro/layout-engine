Berikut **Blueprint NPM Layout Package** yang bisa Anda gunakan sebagai dasar membuat **package layout profesional**. Blueprint ini mengikuti pola yang dipakai di banyak design system modern seperti Material UI dan Chakra UI.

Saya buat dengan fokus pada **skalabilitas, maintainability, dan reusable architecture**.

---

# 1. Struktur Folder Utama

Struktur package sebaiknya seperti ini:

```
layout-engine
│
├── package.json
├── tsconfig.json
├── README.md
│
├── src
│   │
│   ├── core
│   │   ├── layoutEngine.ts
│   │   ├── styleResolver.ts
│   │   ├── spacingSystem.ts
│   │   └── responsiveSystem.ts
│   │
│   ├── primitives
│   │   ├── Box
│   │   │   ├── Box.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Flex
│   │   ├── Grid
│   │   ├── Stack
│   │   ├── Container
│   │   ├── Spacer
│   │   └── Center
│   │
│   ├── structures
│   │   ├── HeaderLayout
│   │   ├── SidebarLayout
│   │   ├── SplitLayout
│   │   └── GridLayout
│   │
│   ├── patterns
│   │   ├── DashboardLayout
│   │   ├── AuthLayout
│   │   ├── LandingLayout
│   │   └── BlogLayout
│   │
│   ├── contracts
│   │   ├── LayoutProps.ts
│   │   ├── FlexProps.ts
│   │   └── GridProps.ts
│   │
│   └── index.ts
│
└── dist
```

---

# 2. Layer Arsitektur

Blueprint ini dibangun dari **4 layer utama**.

```
Core Engine
     ↓
Layout Primitive
     ↓
Layout Structure
     ↓
Layout Pattern
```

Penjelasan:

| Layer     | Fungsi            |
| --------- | ----------------- |
| Core      | logika layout     |
| Primitive | building block    |
| Structure | struktur halaman  |
| Pattern   | layout siap pakai |

---

# 3. Core Layout Engine

Ini bagian **paling penting**.

Contoh `styleResolver.ts`:

```ts
export const normalizeUnit = (value?: string | number) => {
  if (typeof value === "number") {
    return `${value}px`
  }
  return value
}
```

Digunakan untuk mengubah:

```
16 → 16px
```

---

# 4. Layout Props System

Layout harus dikontrol lewat **props system**.

Contoh:

```ts
export interface LayoutProps {
  padding?: string | number
  margin?: string | number
  width?: string | number
  height?: string | number
  display?: string
}
```

---

# 5. Primitive Example (Box)

Contoh implementasi `Box`.

```tsx
import React from "react"
import { LayoutProps } from "../../contracts/LayoutProps"
import { normalizeUnit } from "../../core/styleResolver"

export const Box = ({
  children,
  padding,
  margin,
  style,
  ...rest
}: LayoutProps & any) => {

  const resolvedStyle = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    ...style
  }

  return (
    <div style={resolvedStyle} {...rest}>
      {children}
    </div>
  )
}
```

---

# 6. Flex Primitive

Contoh:

```tsx
export const Flex = ({
  children,
  justify,
  align,
  gap,
  ...rest
}) => {

  return (
    <Box
      display="flex"
      style={{
        justifyContent: justify,
        alignItems: align,
        gap
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
```

---

# 7. Stack Primitive

Stack sangat penting karena sering digunakan.

```tsx
export const Stack = ({
  children,
  gap = 8
}) => {

  return (
    <Flex
      direction="column"
      gap={gap}
    >
      {children}
    </Flex>
  )
}
```

---

# 8. Layout Structure Example

Contoh `SidebarLayout`.

```tsx
export const SidebarLayout = ({
  sidebar,
  children
}) => {

  return (
    <Flex>
      <Box width="240px">
        {sidebar}
      </Box>

      <Box flex="1">
        {children}
      </Box>
    </Flex>
  )
}
```

---

# 9. Layout Pattern Example

Contoh `DashboardLayout`.

```tsx
export const DashboardLayout = ({
  header,
  sidebar,
  children
}) => {

  return (
    <Box>

      {header}

      <SidebarLayout sidebar={sidebar}>
        {children}
      </SidebarLayout>

    </Box>
  )
}
```

---

# 10. Public API

`src/index.ts`

```ts
export * from "./primitives/Box"
export * from "./primitives/Flex"
export * from "./primitives/Grid"
export * from "./primitives/Stack"
export * from "./primitives/Container"

export * from "./structures/SidebarLayout"

export * from "./patterns/DashboardLayout"
```

---

# 11. Cara Developer Menggunakan

Developer hanya perlu:

```
npm install layout-engine
```

Contoh penggunaan:

```tsx
import {
  DashboardLayout,
  Stack
} from "layout-engine"

function Page() {
  return (

    <DashboardLayout
      header={<Header />}
      sidebar={<Sidebar />}
    >

      <Stack gap={16}>
        <Card/>
        <Card/>
      </Stack>

    </DashboardLayout>

  )
}
```

---

# 12. Tahap Evolusi Package

Jika dikembangkan lebih jauh:

```
Layout Engine
      ↓
UI Component Library
      ↓
Design System
      ↓
Page Builder
```
