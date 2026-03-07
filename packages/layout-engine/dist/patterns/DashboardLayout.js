import { Box } from "../primitives/Box.js";
import { SidebarLayout } from "../structures/SidebarLayout.js";
export function DashboardLayout({ header, sidebar, children }) {
    return Box({
        children: [
            header,
            SidebarLayout({ sidebar, children })
        ]
    });
}
