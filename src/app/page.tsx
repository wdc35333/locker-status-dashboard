'use client';

import Box, { BoxItem } from '@/components/box';
import useData from '@/hooks/useData';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

export default function DashBoard() {
  const { data, error, isLoading } = useData<BoxItem[]>();
  const boxList = data ?? [];

  const layoutBounds = boxList.reduce(
    (acc, item) => {
      const right = item.shape.left + item.shape.width;
      const bottom = item.shape.top + item.shape.height;

      return {
        maxRight: Math.max(acc.maxRight, right),
        maxBottom: Math.max(acc.maxBottom, bottom),
      };
    },
    { maxRight: 1, maxBottom: 1 },
  );

  const scaleX = CANVAS_WIDTH / layoutBounds.maxRight;
  const scaleY = CANVAS_HEIGHT / layoutBounds.maxBottom;

  return (
    <main className="w-[1024px] h-[768px] overflow-hidden border">
      {error && <p>{error}</p>}
      {!error && isLoading && <p>불러오는 중...</p>}
      {!error && !isLoading && (
        <section className="relative w-full h-full">
          {boxList.map((item) => (
            <Box key={item.box_id} item={item} scaleX={scaleX} scaleY={scaleY} />
          ))}
        </section>
      )}
    </main>
  );
}
