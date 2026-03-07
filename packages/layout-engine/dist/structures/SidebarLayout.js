import { Flex } from "../primitives/Flex.js";
import { Box } from "../primitives/Box.js";
import { resolveResponsive } from "../core/responsiveSystem.js";
import { normalizeUnit } from "../core/styleResolver.js";
export function SidebarLayout({ sidebar, children, sidebarWidth = 240, viewportWidth = 1024 }) {
    var _a;
    // Resolve responsive sidebarWidth based on viewport
    const resolvedWidth = normalizeUnit((_a = resolveResponsive(sidebarWidth, viewportWidth)) !== null && _a !== void 0 ? _a : 240);
    return Flex({
        gap: 16,
        children: [
            Box({ width: resolvedWidth, children: sidebar }),
            Box({ style: { flex: 1 }, children })
        ]
    });
}
