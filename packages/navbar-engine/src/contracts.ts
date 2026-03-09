
import { LayoutProps } from "@damarkuncoro/layout-engine";

export interface NavbarProps extends LayoutProps {
  variant?: 'default' | 'sticky' | 'floating';
  colorScheme?: 'light' | 'dark';
}

export interface NavbarBrandProps extends LayoutProps {}

export interface NavbarMenuProps extends LayoutProps {}

export interface NavbarMenuItemProps extends LayoutProps {
  href?: string;
  isActive?: boolean;
}

export interface NavbarEndProps extends LayoutProps {}
