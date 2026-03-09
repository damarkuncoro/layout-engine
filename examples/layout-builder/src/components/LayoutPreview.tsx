import { Box, Flex, Stack } from '@damarkuncoro/layout-engine-react'
import { LayoutConfig, LayoutElement } from '../types'
import { ViewportSize } from '../App'

interface LayoutPreviewProps {
  config: LayoutConfig;
  viewport: ViewportSize;
  onSelectElement: (id: string) => void;
  selectedElementId: string | null;
}

const VIEWPORT_WIDTHS: Record<ViewportSize, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%'
}

export function LayoutPreview({ config, viewport, onSelectElement, selectedElementId }: LayoutPreviewProps) {
  const renderElement = (el: LayoutElement) => {
    const isSelected = selectedElementId === el.id;
    const baseStyle = {
      backgroundColor: el.backgroundColor,
      padding: el.padding,
      borderRadius: el.borderRadius || '0.5rem',
      textAlign: el.textAlign || 'left',
      fontSize: el.fontSize || '1rem',
      color: el.color || 'inherit',
      zIndex: el.zIndex,
      position: el.position || 'relative',
      boxShadow: isSelected ? '0 0 0 2px #3b82f6, 0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: isSelected ? 'none' : undefined,
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelectElement(el.id);
    };

    switch (el.type) {
      case 'box':
        return (
          <Box
            key={el.id}
            onClick={handleClick}
            style={baseStyle}
            className={el.className}
          >
            {el.content}
          </Box>
        )
      case 'flex':
        return (
          <Flex
            key={el.id}
            direction={el.direction}
            gap={el.gap}
            onClick={handleClick}
            style={baseStyle}
            className={el.className}
          >
            {el.content}
          </Flex>
        )
      case 'stack':
        return (
          <Stack
            key={el.id}
            gap={el.gap}
            onClick={handleClick}
            style={baseStyle}
            className={el.className}
          >
            {el.content}
          </Stack>
        )
      default:
        return null
    }
  }

  return (
    <Box 
      onClick={() => onSelectElement('')}
      style={{ 
        flex: 1, 
        backgroundColor: '#f3f4f6', 
        padding: '2rem', 
        overflowY: 'auto', 
        display: 'flex', 
        justifyContent: 'center' 
      }}
    >
      <Box 
        style={{ 
          width: VIEWPORT_WIDTHS[viewport],
          transition: 'width 0.3s ease-in-out',
          backgroundColor: config.backgroundColor,
          padding: config.padding,
          borderRadius: viewport === 'desktop' ? '0' : '1rem',
          boxShadow: viewport === 'desktop' ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          minHeight: '100%',
          border: viewport === 'desktop' ? 'none' : '8px solid #1e1e1e',
          overflow: 'hidden'
        }}
      >
        {config.direction === 'row' ? (
          <Flex gap={config.gap}>
            {config.children.map(renderElement)}
          </Flex>
        ) : (
          <Stack gap={config.gap}>
            {config.children.map(renderElement)}
          </Stack>
        )}
      </Box>
    </Box>
  )
}
