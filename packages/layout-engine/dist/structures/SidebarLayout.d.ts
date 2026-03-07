import type { SidebarLayoutContract } from "../system/contracts.js";
import type { CSSLength, ResponsiveValue } from "../system/types.js";
export interface ResponsiveSidebarLayoutProps extends Omit<SidebarLayoutContract, "sidebarWidth"> {
    sidebarWidth?: ResponsiveValue<CSSLength>;
    viewportWidth?: number;
}
export declare function SidebarLayout({ sidebar, children, sidebarWidth, viewportWidth }: ResponsiveSidebarLayoutProps): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
