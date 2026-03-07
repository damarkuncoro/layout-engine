import type { CSSLength, HeadlessNode, ResponsiveValue } from "./types.js";
export type NodeLike = HeadlessNode | string | number | boolean | null | undefined;
export interface SidebarLayoutContract {
    sidebar: NodeLike;
    children: NodeLike;
    sidebarWidth?: CSSLength | ResponsiveValue<CSSLength>;
    viewportWidth?: number;
}
export interface HeaderLayoutContract {
    header: NodeLike;
    children: NodeLike;
}
export interface DashboardLayoutContract {
    header: NodeLike;
    sidebar: NodeLike;
    children: NodeLike;
}
