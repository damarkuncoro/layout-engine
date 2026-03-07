import type { NavbarProps } from "./contracts.js"
import { Navbar } from "./Navbar.js"

export function NavbarTransparentSolid(props: NavbarProps) {
  return Navbar({
    position: "sticky",
    top: 0,
    variant: "transparent",
    solidOnScroll: true,
    shrinkOnScroll: true,
    elevation: true,
    border: true,
    contentPadding: "0 16px",
    barPadding: "0 8px",
    ...props
  })
}

export function NavbarTopStickyLight(props: NavbarProps) {
  return Navbar({
    position: "sticky",
    top: 0,
    variant: "light",
    elevation: true,
    border: true,
    contentPadding: "0 16px",
    barPadding: "0 8px",
    ...props
  })
}

export function NavbarCenteredBrand(props: NavbarProps) {
  const {
    left,
    center,
    right,
    height = 64,
    position = "sticky",
    top = 0,
    variant = "light",
    background,
    elevation = false,
    border = false,
    contained = true,
    style
  } = props
  return Navbar({
    left: left ?? null,
    center,
    right: right ?? null,
    height,
    position,
    top,
    variant,
    background,
    elevation,
    border,
    contained,
    centerAbsolute: true,
    contentPadding: "0 16px",
    barPadding: "0 8px",
    style: {
      ...style,
      position
    }
  })
}

export function NavbarUnderlineOnly(props: NavbarProps) {
  return Navbar({
    variant: "transparent",
    elevation: false,
    border: true,
    contentPadding: "0 16px",
    barPadding: "0 8px",
    ...props
  })
}

export function NavbarGlassBlur(props: NavbarProps) {
  return Navbar({
    variant: "transparent",
    elevation: false,
    border: true,
    contentPadding: "0 20px",
    barPadding: "8px 12px",
    style: {
      backdropFilter: "saturate(180%) blur(12px)",
      WebkitBackdropFilter: "saturate(180%) blur(12px)",
      backgroundColor: "rgba(255,255,255,0.6)"
    },
    ...props
  })
}

export function NavbarModern(props: NavbarProps) {
  return Navbar({
    variant: "light",
    elevation: true,
    border: true,
    contentPadding: "0 16px",
    barPadding: "0 8px",
    ...props
  })
}

export function NavbarBrutalist(props: NavbarProps) {
  return Navbar({
    variant: "light",
    elevation: false,
    border: true,
    contentPadding: "0 16px",
    barPadding: "0 8px",
    style: {
      border: "4px solid #000000",
      boxShadow: "8px 8px 0 0 rgba(0,0,0,1)",
      borderRadius: "0"
    },
    ...props
  })
}

export function NavbarFloating(props: NavbarProps) {
  return Navbar({
    variant: "light",
    elevation: true,
    border: true,
    contentPadding: "0 20px",
    barPadding: "8px 12px",
    style: {
      marginTop: "16px",
      borderRadius: "12px",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    },
    ...props
  })
}
