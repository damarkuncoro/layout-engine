import type { DashboardLayoutContract } from "../system/contracts.js";
export declare function DashboardLayout({ header, sidebar, children }: DashboardLayoutContract): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
