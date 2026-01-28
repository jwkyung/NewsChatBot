import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '@/lib/prisma';

// 동적 라우트로 명시 (정적 생성 방지)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');

    if (!keyword) {
      return NextResponse.json(
        { error: '키워드가 필요합니다.' },
        { status: 400 }
      );
    }

    // Google News RSS 피드 URL
    const encodedKeyword = encodeURIComponent(keyword);
    const rssUrl = `https://news.google.com/rss/search?q=${encodedKeyword}&hl=ko&gl=KR&ceid=KR:ko`;

    const response = await axios.get(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data, { xmlMode: true });
    const newsItems: NewsItem[] = [];

    $('item').each((index, element) => {
      if (newsItems.length >= 10) return false;

      const $item = $(element);
      const title = $item.find('title').text();
      const link = $item.find('link').text();
      const description = $item.find('description').text();
      const pubDate = $item.find('pubDate').text();
      const source = $item.find('source').text() || 'Google News';

      // HTML 태그 제거 (정규식 사용)
      const snippet = description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 200);

      newsItems.push({
        title,
        link,
        snippet,
        source,
        date: pubDate,
      });
    });

    // 데이터베이스에 저장
    try {
      const search = await prisma.search.create({
        data: {
          keyword,
          newsItems: {
            create: newsItems.map((item) => ({
              title: item.title,
              link: item.link,
              snippet: item.snippet,
              source: item.source,
              date: item.date || null,
            })),
          },
        },
        include: {
          newsItems: true,
        },
      });

      console.log('검색 기록 저장 성공:', search.id);
      return NextResponse.json({ 
        news: newsItems,
        searchId: search.id,
        savedAt: search.createdAt
      });
    } catch (dbError: any) {
      // DB 저장 실패해도 뉴스는 반환
      console.error('DB 저장 오류:', dbError);
      console.error('DB 오류 상세:', {
        message: dbError.message,
        code: dbError.code,
        meta: dbError.meta
      });
      return NextResponse.json({ 
        news: newsItems,
        warning: '뉴스는 검색되었지만 데이터베이스 저장에 실패했습니다.',
        dbError: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }
  } catch (error: any) {
    console.error('뉴스 검색 오류:', error);
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}
