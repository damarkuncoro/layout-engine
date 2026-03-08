# @damarkuncoro/navbar-engine

Headless navbar engine with slots and variants. Paket ini dirancang untuk memudahkan pembuatan navigasi tingkat lanjut dengan fleksibilitas tata letak penuh, struktur data menu yang kuat, dan dukungan aksesibilitas (A11y).

## Instalasi

```bash
npm install @damarkuncoro/navbar-engine
```

**Kebutuhan**: Bergantung pada `@damarkuncoro/layout-engine`.

## Fitur Unggulan
- **Slot Architecture**: Gunakan slot `left`, `center`, `right`, `search`, dan `actions` untuk kontrol konten penuh.
- **Structured Menu & Dropdowns**: Dukungan interface `NavMenuItem` untuk menu bertingkat (dropdown) yang berfungsi di desktop maupun mobile (accordion).
- **Integrated Search & Actions**: Slot khusus untuk Search Bar dan Action Buttons (CTA) dengan varian gaya yang beragam.
- **Semantic & Accessible**: Menggunakan tag HTML semantik (`<nav>`, `<ul>`, `<li>`, `<button>`) dan atribut ARIA untuk aksesibilitas yang lebih baik.
- **Modular Design**: Komponen internal dipisahkan secara modular (`mainbar` dan `mobilepanel`) untuk pemeliharaan yang lebih mudah.
- **Scroll-Aware**: Logika bawaan untuk fitur `sticky`, `shrinkOnScroll`, dan `solidOnScroll`.
- **Ready-to-use Presets**: Dilengkapi dengan preset modern seperti `NavbarGlassBlur`, `NavbarModern`, `NavbarFloating`, dll.

## Penggunaan Dasar

### Navbar dengan Menu Terstruktur & Search

```js
import { Navbar } from "@damarkuncoro/navbar-engine"

const myNav = Navbar({
  left: "MyLogo",
  center: [
    { id: "home", label: "Home", href: "/" },
    { 
      id: "products", 
      label: "Products", 
      dropdown: [
        { id: "p1", label: "Analytics", href: "/analytics" },
        { id: "p2", label: "Automation", href: "/automation" }
      ],
      dropdownVariant: "glass"
    }
  ],
  search: { 
    placeholder: "Search products...", 
    showOnMobile: true 
  },
  actions: [
    { id: "login", label: "Login", variant: "outline" },
    { id: "signup", label: "Sign Up", variant: "primary" }
  ],
  alignment: "between", // Pilihan: "left", "center", "right", "between"
  position: "sticky",
  elevation: true
})
```

### Menggunakan Presets Modern

```js
import { NavbarModern, NavbarGlassBlur } from "@damarkuncoro/navbar-engine"

// Navbar dengan efek glassmorphism yang cantik
const glassNav = NavbarGlassBlur({
  left: "Brand",
  center: [...items],
  right: "Get Started"
})
```

## Modular Components
Paket ini memungkinkan Anda mengimpor komponen spesifik untuk kustomisasi lebih dalam:
```js
import { NavbarMainBar, NavbarMobilePanel, getBgForVariant } from "@damarkuncoro/navbar-engine"
```

## Struktur Paket
- **ESM (Recommended)**: `import { ... } from "@damarkuncoro/navbar-engine"`
- **CJS**: `const { ... } = require("@damarkuncoro/navbar-engine")`

## Lisensi
MIT
