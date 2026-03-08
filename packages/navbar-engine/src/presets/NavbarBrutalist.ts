import type { NavbarProps } from "../contracts.js"
import { Navbar } from "../navbar/Navbar.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarBrutalist(props: NavbarProps) {
  return Navbar({
    variant: "light",
    elevation: false,
    border: true,
    contentPadding: NAVBAR_DEFAULTS.CONTENT_PADDING,
    barPadding: NAVBAR_DEFAULTS.BAR_PADDING,
    style: {
      border: NAVBAR_DEFAULTS.BORDER_BRUTALIST,
      boxShadow: NAVBAR_DEFAULTS.SHADOW_BRUTALIST,
      borderRadius: "0"
    },
    ...props
  })
}
