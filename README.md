# 뉴스 챗봇

키워드를 입력하면 구글에서 관련 뉴스를 검색하고, AI가 뉴스를 요약하며, 뉴스 기반으로 대화할 수 있는 챗봇 애플리케이션입니다.

## 기능

- 🔍 **뉴스 검색**: 키워드로 구글 뉴스에서 최신 뉴스 10개 검색
- 📝 **AI 요약**: Google Gemini API를 사용한 뉴스 자동 요약
- 💬 **챗봇**: 검색된 뉴스 기반으로 AI와 대화

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 Google Gemini API 키를 추가하세요:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Google Gemini API 키는 [Google AI Studio](https://makersuite.google.com/app/apikey)에서 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## ⚠️ 보안 주의사항

**중요**: API 키는 절대 Git에 커밋하지 마세요!

- `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- GitHub에 업로드하기 전에 `.env.local` 파일이 커밋되지 않았는지 확인하세요
- 코드에 API 키를 하드코딩하지 마세요 (현재 코드는 안전합니다)

## Vercel 배포

### 1. Vercel에 프로젝트 연결

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 저장소를 선택하거나 프로젝트를 업로드

### 2. 환경변수 설정

Vercel 대시보드에서:

1. 프로젝트 설정(Settings)으로 이동
2. "Environment Variables" 섹션으로 이동
3. 다음 환경변수를 추가:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Google Gemini API 키
4. "Save" 클릭

**⚠️ 주의**: Vercel 환경변수에 API 키를 설정해야 합니다. `.env.local` 파일은 로컬 개발용입니다.

### 3. 배포

프로젝트가 자동으로 배포됩니다. 배포가 완료되면 제공된 URL로 접속할 수 있습니다.

## 프로젝트 구조

```
chatbot/
├── app/
│   ├── api/
│   │   ├── news/          # 뉴스 검색 API
│   │   ├── summarize/     # 뉴스 요약 API
│   │   └── chat/          # 챗봇 API
│   ├── layout.tsx         # 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── page.module.css    # 스타일
│   └── globals.css        # 전역 스타일
├── .env.example           # 환경변수 예제
├── package.json
└── README.md
```

## API 엔드포인트

### GET /api/news
키워드로 뉴스를 검색합니다.

**Query Parameters:**
- `keyword`: 검색할 키워드

**Response:**
```json
{
  "news": [
    {
      "title": "뉴스 제목",
      "link": "뉴스 링크",
      "snippet": "뉴스 요약",
      "source": "출처",
      "date": "발행일"
    }
  ]
}
```

### POST /api/summarize
뉴스 목록을 요약합니다.

**Request Body:**
```json
{
  "news": [...]
}
```

**Response:**
```json
{
  "summary": "요약된 내용"
}
```

### POST /api/chat
뉴스 기반으로 챗봇과 대화합니다.

**Request Body:**
```json
{
  "message": "사용자 메시지",
  "news": [...],
  "conversationHistory": [...]
}
```

**Response:**
```json
{
  "answer": "AI 응답"
}
```

## 라이선스

MIT
