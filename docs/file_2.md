Sekarang kita masuk ke konsep yang lebih **arsitektural**, yaitu **Layout Engine Architecture**. Ini yang membedakan **package layout biasa** dengan **framework layout yang benar-benar powerful**.

Tujuan kita bukan hanya membuat komponen seperti `Flex` atau `Grid`, tetapi membuat **mesin yang mengatur layout secara sistematis**.

---

# 1. Konsep Layout Engine

Layout Engine adalah **sistem yang mengatur bagaimana komponen ditempatkan di halaman**.

Browser sendiri sebenarnya punya layout engine seperti:

* Blink layout engine (digunakan di Google Chrome)
* Gecko layout engine (digunakan di Mozilla Firefox)

Tetapi di level aplikasi, kita bisa membuat **layout engine kecil untuk UI kita**.

---

# 2. Layer Arsitektur Layout Engine

Biasanya terdiri dari **4 layer utama**.

```
Layout Engine
     │
     ├── Layout Primitive
     │
     ├── Layout System
     │
     ├── Layout Structure
     │
     └── Layout Pattern
```

Mari kita bahas satu per satu.

---

# 3. Layer 1 — Layout Primitive

Ini **fondasi paling bawah**.

Contohnya:

```
Box
Flex
Grid
Stack
Container
Spacer
Center
```

Semua layout lain dibangun dari sini.

Contoh:

```jsx
<Flex gap="16">
  <Sidebar />
  <Content />
</Flex>
```

---

# 4. Layer 2 — Layout System

Layer ini mengatur **bagaimana layout dikontrol**.

Biasanya berupa **props system**.

Contoh:

```jsx
<Box
  padding="16"
  margin="8"
  width="100%"
  display="flex"
/>
```

Artinya developer tidak menulis CSS manual.

Semua dikontrol dari **props**.

Contoh implementasi:

```javascript
const resolveSpacing = (value) => {
  return typeof value === "number" ? `${value}px` : value
}
```

---

# 5. Layer 3 — Layout Structure

Ini adalah **struktur halaman**.

Contohnya:

### Header Layout

```
Header
Content
Footer
```

### Sidebar Layout

```
Sidebar | Content
```

### Split Layout

```
Left | Right
```

Contoh komponen:

```jsx
<SidebarLayout
  sidebar={<Sidebar />}
>
  <Content />
</SidebarLayout>
```

---

# 6. Layer 4 — Layout Pattern

Ini adalah **layout siap pakai untuk aplikasi**.

Contoh:

### Dashboard Layout

```
Header
Sidebar | Content
```

### Auth Layout

```
Center
Login Form
```

### Landing Layout

```
Hero
Feature
Pricing
Footer
```

Contoh penggunaan:

```jsx
<DashboardLayout>
  <DashboardContent />
</DashboardLayout>
```

---

# 7. Layout Engine Workflow

Alur kerja layout engine kira-kira seperti ini:

```
Developer Code
       │
       ↓
Layout Component
       │
       ↓
Layout Props Resolver
       │
       ↓
CSS Style Generator
       │
       ↓
DOM Rendering
```

Contoh:

```jsx
<Box padding="16">
```

diubah menjadi

```css
padding: 16px;
```

---

# 8. Konsep Sangat Penting: Layout Contract

Ini ide yang sangat bagus untuk package Anda.

Layout Contract adalah **aturan bagaimana layout boleh digunakan**.

Contoh:

```ts
interface SidebarLayoutContract {
  sidebar: ReactNode
  children: ReactNode
  width?: string
}
```

Dengan ini:

* layout konsisten
* developer tidak salah struktur

---

# 9. Struktur NPM Package yang Ideal

Jika kita susun dengan benar:

```
layout-engine
│
├── core
│   ├── styleResolver
│   ├── spacingSystem
│   └── layoutEngine
│
├── primitives
│   ├── Box
│   ├── Flex
│   ├── Grid
│   ├── Stack
│   └── Container
│
├── structures
│   ├── SidebarLayout
│   ├── HeaderLayout
│   └── SplitLayout
│
└── patterns
    ├── DashboardLayout
    ├── AuthLayout
    └── LandingLayout
```

---

# 10. Potensi Besar Jika Dibuat Serius

Jika package ini matang, bisa menjadi **fondasi UI ecosystem**.

Contoh evolusi produk:

```
Layout Engine
      ↓
UI Component Library
      ↓
Design System
      ↓
Framework
```

Banyak framework besar sebenarnya berkembang seperti ini.

Contohnya:

* Bootstrap
* Tailwind CSS

Awalnya hanya **layout dan utility**.

---

# Insight Penting untuk Anda

Melihat percakapan Anda sebelumnya tentang:

* Base UI React
* UI Contract
* Component system

Sebenarnya Anda sudah berada di arah **membangun design system sendiri**.

Jika ini dilanjutkan, Anda bisa membuat sesuatu seperti:

```
RPanel UI Engine
```

yang bisa dipakai di semua project Anda.

---

Kalau Anda mau, kita bisa lanjut ke bagian yang **paling menentukan kualitas package ini**, yaitu:

### **"12 Layout Rules yang dipakai oleh UI framework besar"**

Ini seperti **hukum fisika layout** yang membuat sistem layout tetap konsisten dan scalable.

---

# Developer Guide — Layout Engine

Panduan ini memandu kontributor dalam membangun, menambah fitur, dan menjaga kualitas “layout-engine” sesuai arsitektur dan prinsip yang telah dijelaskan.

## 1. Prasyarat & Setup

- Node.js LTS terbaru (disarankan ≥ 18).
- Package manager bebas (npm/pnpm/yarn); konsisten di tim.
- TypeScript aktif dengan strict mode.
- Rekomendasi bundler: tsup/rollup/esbuild (pilih salah satu dan standarkan).

Struktur minimal proyek (acuan):

```
layout-engine
│
├── package.json
├── tsconfig.json
│
├── src
│   ├── core
│   ├── system
│   ├── primitives
│   ├── structures
│   ├── patterns
│   └── index.ts
└── docs
```

## 2. Layer Boundaries & Dependency Rules

Kita memakai 5 layer dengan dependency satu arah (topologi DAG) dari bawah ke atas:

```
Core → System → Primitives → Structures → Patterns
```

- Core: fungsi murni (normalisasi, kalkulasi), bebas dari React dan UI.
- System: skema props, resolver (spacing, responsive, mapping), tanpa UI.
- Primitives: komponen dasar (Box, Flex, Grid, Stack) yang hanya memetakan props → style.
- Structures: komposisi Primitives membentuk struktur halaman (SidebarLayout, HeaderLayout).
- Patterns: komposisi Structures untuk kebutuhan aplikasi (DashboardLayout, AuthLayout).

Aturan tambahan (selaras dengan UI Rules):
- UI Contract → tidak bergantung apa pun (kontrak tipe murni).
- Base UI → implementasi berdasar Contract.
- Tailwind/skin → hanya lapisan tampilan; tidak menyusup ke Contract.
- Modules → depend ke Core/Primitives/Structures sesuai kebutuhan; tidak melanggar arah dependency.

## 3. Props System & Mapping

Semua layout dikontrol lewat props terketik. Prinsip:
- Props → di-resolve oleh System (normalisasi unit, responsive, token).
- Primitives hanya menerapkan hasil resolve ke style.
- Hindari CSS acak di Structures/Patterns; gunakan komposisi.

Contoh tipe dasar:

```ts
type CSSLength = number | string

export interface LayoutProps {
  padding?: CSSLength
  margin?: CSSLength
  width?: CSSLength
  height?: CSSLength
  display?: React.CSSProperties["display"]
  style?: React.CSSProperties
}
```

Normalisasi unit:

```ts
export const normalizeUnit = (v?: number | string) =>
  typeof v === "number" ? `${v}px` : v
```

Contoh Box (prinsip minimal, mapping prop → style):

```tsx
function Box({
  children,
  padding,
  margin,
  width,
  height,
  display,
  style,
  ...rest
}: React.PropsWithChildren<LayoutProps>) {
  const resolved: React.CSSProperties = {
    padding: normalizeUnit(padding),
    margin: normalizeUnit(margin),
    width: normalizeUnit(width),
    height: normalizeUnit(height),
    display,
    ...style
  }
  return <div style={resolved} {...rest}>{children}</div>
}
```

Contoh Flex:

```tsx
interface FlexProps extends LayoutProps {
  justify?: React.CSSProperties["justifyContent"]
  align?: React.CSSProperties["alignItems"]
  gap?: CSSLength
  direction?: React.CSSProperties["flexDirection"]
}

function Flex({
  children,
  justify,
  align,
  gap,
  direction = "row",
  style,
  ...rest
}: React.PropsWithChildren<FlexProps>) {
  return (
    <Box
      display="flex"
      style={{
        justifyContent: justify,
        alignItems: align,
        gap: normalizeUnit(gap),
        flexDirection: direction,
        ...style
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
```

## 4. Responsive System

- Breakpoints standar (contoh): sm 640, md 768, lg 1024, xl 1280, 2xl 1536.
- Bentuk nilai responsif:
  - Objek: `{ base, sm, md, lg, xl }`
  - Array: `[base, sm, md, lg, xl]`
- Resolver memilih nilai paling spesifik berdasarkan lebar viewport.
- Angka otomatis menjadi px, string bebas (%, rem, vw/vh, fr untuk grid).

## 5. Spacing & Tokens

- Skala spasi konsisten: 0, 4, 8, 12, 16, 24, 32, 40, 48, 64…
- Gunakan token untuk gap/padding/margin; angka di-resolve ke px.
- Hindari nilai arbitrer di Structures/Patterns; prefer token/prop.

## 6. Contracts Catalog

Kontrak umum untuk Structures/Patterns:

```ts
type Node = React.ReactNode

export interface SidebarLayoutContract {
  sidebar: Node
  children: Node
  sidebarWidth?: CSSLength // default 240
}

export interface HeaderLayoutContract {
  header: Node
  children: Node
}

export interface DashboardLayoutContract {
  header: Node
  sidebar: Node
  children: Node
}
```

Contoh implementasi SidebarLayout:

```tsx
function SidebarLayout({
  sidebar,
  children,
  sidebarWidth = 240
}: SidebarLayoutContract) {
  return (
    <Flex gap={16}>
      <Box width={sidebarWidth}>{sidebar}</Box>
      <Box style={{ flex: 1 }}>{children}</Box>
    </Flex>
  )
}
```

## 7. Testing & Validasi

- Core/System:
  - normalizeUnit: angka → px, string tetap, 0 dan nilai non-px.
  - resolver responsif: pemilihan nilai per breakpoint.
- Primitives:
  - mapping props → style (display, width/height, gap, direction).
- Structures/Patterns:
  - snapshot sederhana (render terkomposisi benar).

Framework uji bebas (Jest/Vitest) selama:
- Tes deterministik dan cepat.
- Tersedia script “test” di package.json.

## 8. Build & Publish

Rekomendasi pengaturan package.json:
- exports: deklarasi ESM/CJS bila perlu.
- main/module/types: jelas.
- files: hanya distribusi (dist, tipe).
- sideEffects: false (agar tree-shaking efektif), kecuali ada efek samping.
- peerDependencies: react, react-dom (versi yang didukung).

Pipeline build:
- Transpile TypeScript → dist.
- Generate tipe (.d.ts).
- Cek size bundle jika perlu.

## 9. Quality Gates

Sebelum merge/publish:
- Lint lulus (ESLint/biaya setara).
- Typecheck lulus (tsc —noEmit).
- Test lulus (unit & snapshot relevan).
- Review memastikan tidak ada pelanggaran dependency rules.

## 10. 12 Layout Rules (Versi Awal)

1. Layered-only dependency: hanya bergantung ke layer di bawahnya.
2. Contract-first: Structures/Patterns diekspos via kontrak eksplisit.
3. Props as single source of truth: layout dikontrol via props, bukan CSS manual.
4. Tokens-only spacing: gunakan skala spasi/tokens untuk gap/padding/margin.
5. Consistent units: angka → px; nilai string menghormati satuan CSS valid.
6. Responsive by resolver: gunakan bentuk responsif (objek/array), hindari media query manual.
7. No side effects in Structures: tidak ada style imperative; hanya komposisi primitives.
8. Preserve DOM order: urutan DOM = urutan fokus; layout tidak melanggar aksesibilitas.
9. Semantic guidance: gunakan elemen semantik di Patterns atau dokumentasikan peran/ARIA.
10. Zero default margins in primitives: spacing via gap/stack, bukan margin liar.
11. Animasi aman layout: gunakan transform/opacity; hindari reflow berat.
12. Test the resolver: setiap penambahan props/layout wajib ada uji resolver-nya.

## 11. Contoh Penggunaan

```tsx
function Page() {
  return (
    <DashboardLayout
      header={<Header />}
      sidebar={<Sidebar />}
    >
      <Stack gap={16}>
        <Card />
        <Card />
      </Stack>
    </DashboardLayout>
  )
}
```

---

Dokumen ini bersifat living document. Tambahkan aturan/kontrak baru melalui PR dengan bukti uji dan alasan arsitektural yang jelas.
