/* eslint-disable import/prefer-default-export */
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'data.json 파일을 읽는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
