import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 검색 기록 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const keyword = searchParams.get('keyword');

    const where = keyword ? { keyword: { contains: keyword } } : {};

    const searches = await prisma.search.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      include: {
        newsItems: {
          select: {
            id: true,
            title: true,
            link: true,
            snippet: true,
            source: true,
            date: true,
          },
        },
      },
    });

    return NextResponse.json({ searches });
  } catch (error: any) {
    console.error('검색 기록 조회 오류:', error);
    return NextResponse.json(
      { error: '검색 기록을 가져오는 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}
