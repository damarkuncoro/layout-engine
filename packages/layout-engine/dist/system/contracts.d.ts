import type { CSSLength } from "./types.js";
export type NodeLike = any;
export interface SidebarLayoutContract {
    sidebar: NodeLike;
    children: NodeLike;
    sidebarWidth?: CSSLength;
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
