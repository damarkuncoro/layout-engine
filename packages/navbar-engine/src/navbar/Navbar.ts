
import { Flex, Box } from "@damarkuncoro/layout-engine";
import { NavbarProps, NavbarBrandProps, NavbarMenuProps, NavbarMenuItemProps, NavbarEndProps } from "../contracts.js";

// --- Main Navbar Component ---

export function Navbar(props: NavbarProps) {
  const { children, variant = 'default', colorScheme = 'light', ...rest } = props;

  const baseStyle: any = {
    height: '64px',
    padding: '0 24px',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    backgroundColor: colorScheme === 'light' ? '#ffffff' : '#1a202c',
    color: colorScheme === 'light' ? '#2d3748' : '#e2e8f0',
    borderBottom: colorScheme === 'light' ? '1px solid #e2e8f0' : '1px solid #2d3748',
  };

  if (variant === 'sticky') {
    baseStyle.position = 'sticky';
    baseStyle.top = 0;
    baseStyle.zIndex = 1000;
  }

  if (variant === 'floating') {
    baseStyle.position = 'sticky';
    baseStyle.top = '16px';
    baseStyle.margin = '0 24px';
    baseStyle.borderRadius = '12px';
    baseStyle.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
  }

  return Flex({
    ...rest,
    style: { ...baseStyle, ...props.style },
    children,
  });
}

// --- Navbar Brand ---

function NavbarBrand(props: NavbarBrandProps) {
  return Flex({
    align: "center",
    gap: "12px",
    ...props,
  });
}

// --- Navbar Menu ---

function NavbarMenu(props: NavbarMenuProps) {
  return Flex({
    align: "center",
    gap: "16px",
    ...props,
    style: {
      flex: 1,
      justifyContent: 'center',
      ...props.style
    }
  });
}

// --- Navbar Menu Item ---

function NavbarMenuItem(props: NavbarMenuItemProps) {
  const { isActive, ...rest } = props;
  return Box({
    tag: "a",
    ...rest,
    style: {
      fontSize: '14px',
      fontWeight: isActive ? '600' : '500',
      color: isActive ? (props.style?.color || '#2563eb') : 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      ...props.style
    }
  });
}

// --- Navbar End ---

function NavbarEnd(props: NavbarEndProps) {
  return Flex({
    align: "center",
    gap: "12px",
    ...props,
  });
}

// --- Assign Components to Navbar ---

Navbar.Brand = NavbarBrand;
Navbar.Menu = NavbarMenu;
Navbar.MenuItem = NavbarMenuItem;
Navbar.End = NavbarEnd;
