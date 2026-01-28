import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 동적 라우트로 명시 (정적 생성 방지)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { message, news, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      );
    }

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
        return `${index + 1}. ${item.title}\n   ${item.snippet}\n   출처: ${item.source}\n   링크: ${item.link}\n`;
      })
      .join('\n');

    // 대화 기록 구성
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = '\n\n이전 대화:\n' + conversationHistory
        .slice(-5) // 최근 5개만 포함
        .map((msg: any) => `${msg.role === 'user' ? '사용자' : 'AI'}: ${msg.content}`)
        .join('\n');
    }

    const prompt = `당신은 뉴스 기사를 기반으로 대화하는 AI 어시스턴트입니다. 제공된 뉴스 기사들에 대한 정보를 바탕으로 사용자의 질문에 답변해주세요. 뉴스 기사에 없는 정보에 대해서는 추측하지 말고, 제공된 정보만을 바탕으로 답변해주세요.

뉴스 목록:
${newsText}
${conversationContext}

사용자 질문: ${message}

답변:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('챗봇 응답 오류:', error);
    
    // 더 자세한 에러 메시지
    let errorMessage = '응답을 생성하는 중 오류가 발생했습니다.';
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
