import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 동적 라우트로 명시 (정적 생성 방지)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { news } = await request.json();

    if (!news || !Array.isArray(news) || news.length === 0) {
      return NextResponse.json(
        { error: '뉴스 데이터가 필요합니다.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 뉴스 내용을 텍스트로 변환
    const newsText = news
      .map((item: any, index: number) => {
        return `${index + 1}. ${item.title}\n   ${item.snippet}\n   출처: ${item.source}\n`;
      })
      .join('\n');

    const prompt = `다음은 검색된 뉴스 기사들입니다. 이 뉴스들을 종합적으로 요약해주세요. 각 뉴스의 주요 내용을 간결하게 정리하고, 전체적인 트렌드나 패턴이 있다면 그것도 언급해주세요.

중요: 요약은 반드시 150-200자 이내로 작성해주세요.

뉴스 목록:
${newsText}

요약 (150-200자 이내):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('요약 생성 오류:', error);
    
    // 더 자세한 에러 메시지
    let errorMessage = '요약을 생성하는 중 오류가 발생했습니다.';
    if (error.message) {
      errorMessage += ` (${error.message})`;
    }
    if (error.status) {
      errorMessage += ` [상태 코드: ${error.status}]`;
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}
