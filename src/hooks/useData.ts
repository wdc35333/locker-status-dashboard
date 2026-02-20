'use client';

import { useEffect, useState } from 'react';

export type JsonValue = Record<string, unknown> | unknown[];

export function useData() {
  const [data, setData] = useState<JsonValue | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.');
        }

        const json = (await response.json()) as JsonValue;
        setData(json);
      } catch (err) {
        let message = '알 수 없는 오류가 발생했습니다.';

        if (err instanceof Error) {
          message = err.message;
        }

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading };
}
