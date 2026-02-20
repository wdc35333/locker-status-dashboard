'use client';

import { useMemo, useState } from 'react';

import useBoxStatus from '@/client/hooks/use-box-status';
import Box, { BoxItem } from '@/components/box';
import BoxFilter, { BoxFilterType } from '@/components/box-filter';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

// 상태에 따라 보관함 필터링
const filterBoxByStatus = (item: BoxItem, filter: BoxFilterType) => {
  if (filter === 'all') {
    return true;
  }

  if (filter === 'broken') {
    return item.box_broken_status === 1;
  }

  if (filter === 'empty') {
    return item.box_broken_status === 0 && item.box_status === 0;
  }

  return item.box_broken_status === 0 && item.box_status !== 0;
};

export default function DashBoard() {
  const { data, error, isLoading } = useBoxStatus<BoxItem[]>();
  const boxList = useMemo(() => data ?? [], [data]);
  const [activeFilter, setActiveFilter] = useState<BoxFilterType>('all');

  // 상태에 따라 보관함 필터링
  const filteredBoxList = useMemo(
    () => boxList.filter((item) => filterBoxByStatus(item, activeFilter)),
    [boxList, activeFilter],
  );

  // 보관함 레이아웃 계산
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

  // 보관함 레이아웃 계산
  const scaleX = CANVAS_WIDTH / layoutBounds.maxRight;
  const scaleY = CANVAS_HEIGHT / layoutBounds.maxBottom;

  return (
    <main className="flex w-[1024px] flex-col gap-2"> {/* 메인 컨테이너 */}
      <BoxFilter activeFilter={activeFilter} onChange={setActiveFilter} /> {/* 보관함 필터 */}
      {error && <p>{error}</p>} {/* 에러 메시지 */}
      {!error && isLoading && <p>불러오는 중...</p>} {/* 로딩 메시지 */}
      {!error && !isLoading && (
        <section className="relative w-[1024px] h-[768px] overflow-hidden border bg-zinc-50">
          {/* 보관함 */}
          {filteredBoxList.map((item) => (
            <Box key={item.box_id} item={item} scaleX={scaleX} scaleY={scaleY} />
          ))}
        </section>
      )}
    </main>
  );
}
