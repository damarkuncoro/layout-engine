import { Flex } from "../primitives/Flex.js";
import { SidebarLayout } from "../structures/SidebarLayout.js";
export function DashboardLayout({ header, sidebar, children }) {
    return Flex({
        direction: "column",
        children: [
            header,
            SidebarLayout({ sidebar, children })
        ]
    });
}
