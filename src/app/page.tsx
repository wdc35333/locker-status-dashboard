'use client';

import { useData } from '@/hooks/useData';

export default function DashBoard() {
  const { data, error, isLoading } = useData();

  return (
    <main className="max-w-[1024px] max-h-[768px] overflow-y-auto">
      {error && <p>{error}</p>}
      {!error && isLoading && <p>불러오는 중...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </main>
  );
}
