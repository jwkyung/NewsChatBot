import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 검색 기록 목록 조회
export async function GET(request: NextRequest) {
  try {
    // Prisma 클라이언트 확인
    if (!prisma) {
      console.error('Prisma 클라이언트가 초기화되지 않았습니다.');
      return NextResponse.json(
        { error: '데이터베이스 연결 오류', details: 'Prisma 클라이언트 초기화 실패' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const keyword = searchParams.get('keyword');

    const where = keyword ? { keyword: { contains: keyword } } : {};

    console.log('검색 기록 조회 시작:', { limit, keyword, where });

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

    console.log(`검색 기록 조회 성공: ${searches.length}개 발견`);
    return NextResponse.json({ searches });
  } catch (error: any) {
    console.error('검색 기록 조회 오류:', error);
    console.error('오류 상세:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    // 더 자세한 오류 정보 반환
    return NextResponse.json(
      { 
        error: '검색 기록을 가져오는 중 오류가 발생했습니다.', 
        details: error.message,
        code: error.code,
        // 개발 환경에서만 상세 정보 제공
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { status: 500 }
    );
  }
}
