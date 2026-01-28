import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 특정 검색 기록 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const search = await prisma.search.findUnique({
      where: {
        id: params.id,
      },
      include: {
        newsItems: true,
      },
    });

    if (!search) {
      return NextResponse.json(
        { error: '검색 기록을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ search });
  } catch (error: any) {
    console.error('검색 기록 조회 오류:', error);
    return NextResponse.json(
      { error: '검색 기록을 가져오는 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}

// 검색 기록 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.search.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: '검색 기록이 삭제되었습니다.' });
  } catch (error: any) {
    console.error('검색 기록 삭제 오류:', error);
    return NextResponse.json(
      { error: '검색 기록을 삭제하는 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}
