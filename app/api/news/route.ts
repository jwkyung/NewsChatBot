import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

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

    return NextResponse.json({ news: newsItems });
  } catch (error: any) {
    console.error('뉴스 검색 오류:', error);
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}
