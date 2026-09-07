import type { ReactNode } from 'react';

/**
 * 将文案中的 `**加粗**` 标记渲染为 <strong>。
 * 用于将景点实体名称 / 城市 / 周边地标在正文中以语义化加粗呈现。
 */
export function richText(text: string, keyPrefix = 'rich'): ReactNode[] {
  const parts = text.split('**');
  const nodes: ReactNode[] = [];
  parts.forEach((part, index) => {
    if (!part) return;
    if (index % 2 === 1) {
      nodes.push(
        <strong key={`${keyPrefix}-${index}`} className="font-semibold">
          {part}
        </strong>
      );
    } else {
      nodes.push(part);
    }
  });
  return nodes;
}
