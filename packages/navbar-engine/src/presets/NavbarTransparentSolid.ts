import type { NavbarProps } from "../contracts.js"
import { Navbar } from "../navbar/Navbar.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarTransparentSolid(props: NavbarProps) {
  return Navbar({
    position: "sticky",
    top: 0,
    variant: "transparent",
    solidOnScroll: true,
    shrinkOnScroll: true,
    elevation: true,
    border: true,
    contentPadding: NAVBAR_DEFAULTS.CONTENT_PADDING,
    barPadding: NAVBAR_DEFAULTS.BAR_PADDING,
    ...props
  })
}
