import { Flex } from "../primitives/Flex.js";
import { Box } from "../primitives/Box.js";
export function SidebarLayout({ sidebar, children, sidebarWidth = 240 }) {
    return Flex({
        gap: 16,
        children: [
            Box({ width: sidebarWidth, children: sidebar }),
            Box({ style: { flex: 1 }, children })
        ]
    });
}
