import type { SidebarLayoutContract } from "../system/contracts.js";
export declare function SidebarLayout({ sidebar, children, sidebarWidth }: SidebarLayoutContract): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
