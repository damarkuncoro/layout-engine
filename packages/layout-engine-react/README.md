# @damarkuncoro/layout-engine-react

React adapter for `layout-engine` (headless → React components). Mengubah node headless dari `layout-engine` menjadi komponen React murni untuk digunakan dalam aplikasi React modern.

## Instalasi

```bash
npm install @damarkuncoro/layout-engine-react
```

**Kebutuhan**: Pastikan `react` dan `react-dom` versi 18 ke atas sudah terpasang.

## Fitur Unggulan
- **Seamless Integration**: Konversi otomatis dari struktur node layout ke komponen React.
- **Primitives**: Box, Flex, Stack, Grid, Spacer, Center, Container sebagai komponen React.
- **Structures**: SidebarLayout, SplitLayout, DashboardLayout, HeaderLayout, dll.
- **Automatic Keys**: Penanganan child React yang aman dari peringatan key unik.
- **Viewport Wrapper**: Kontrol responsivitas tata letak di level komponen.

## Penggunaan Dasar

### Contoh Layout Sidebar Sederhana

```jsx
import React from "react"
import { SidebarLayout, Stack, Box } from "@damarkuncoro/layout-engine-react"

export default function App() {
  const sidebar = Box({ children: "Sidebar Menu" })
  const content = Stack({ 
    gap: 16, 
    children: [
      Box({ children: "Card 1" }), 
      Box({ children: "Card 2" })
    ] 
  })

  return (
    <SidebarLayout
      sidebar={sidebar}
      sidebarWidth={{ base: 120, md: 200, xl: 280 }}
    >
      {content}
    </SidebarLayout>
  )
}
```

### Menggunakan Viewport dinamis

```jsx
import { Viewport } from "@damarkuncoro/layout-engine-react"

// Viewport otomatis mendeteksi ukuran layar saat ini
const ResponsiveLayout = () => (
  <Viewport>
    {(width) => (
      <Box width={width > 768 ? "50%" : "100%"}>
        Responsive Content
      </Box>
    )}
  </Viewport>
)
```

## Struktur Paket
- **ESM (Recommended)**: `import { ... } from "@damarkuncoro/layout-engine-react"`
- **CJS**: `const { ... } = require("@damarkuncoro/layout-engine-react")`

## Lisensi
MIT
