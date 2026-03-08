import type { NavbarProps } from "../contracts.js"
import { Navbar } from "../navbar/Navbar.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarFloating(props: NavbarProps) {
  return Navbar({
    variant: "light",
    elevation: true,
    border: true,
    contentPadding: NAVBAR_DEFAULTS.CONTENT_PADDING,
    barPadding: NAVBAR_DEFAULTS.GLASS_PADDING_Y,
    style: {
      marginTop: NAVBAR_DEFAULTS.FLOATING_MARGIN_TOP,
      borderRadius: NAVBAR_DEFAULTS.FLOATING_BORDER_RADIUS,
      boxShadow: NAVBAR_DEFAULTS.SHADOW_FLOATING
    },
    ...props
  })
}
