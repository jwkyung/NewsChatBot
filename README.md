# 뉴스 챗봇

키워드를 입력하면 구글에서 관련 뉴스를 검색하고, AI가 뉴스를 요약하며, 뉴스 기반으로 대화할 수 있는 챗봇 애플리케이션입니다.

## 기능

- 🔍 **뉴스 검색**: 키워드로 구글 뉴스에서 최신 뉴스 10개 검색
- 📝 **AI 요약**: Google Gemini API를 사용한 뉴스 자동 요약
- 💬 **챗봇**: 검색된 뉴스 기반으로 AI와 대화
- 💾 **데이터베이스**: 검색 기록과 뉴스를 데이터베이스에 자동 저장 및 조회

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **AI**: Google Gemini API
- **Database**: Prisma + PostgreSQL (Vercel) / SQLite (로컬)
- **Deployment**: Vercel

## 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 다음 환경변수를 추가하세요:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL="file:./dev.db"
```

Google Gemini API 키는 [Google AI Studio](https://makersuite.google.com/app/apikey)에서 발급받을 수 있습니다.

### 3. 데이터베이스 초기화

```bash
npm run db:generate
npm run db:push
```

### 4. 개발 서버 실행

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

### 2. Vercel Postgres 데이터베이스 생성

**⚠️ 중요**: Vercel에서는 SQLite가 작동하지 않으므로 PostgreSQL을 사용해야 합니다.

1. Vercel 대시보드에서 **Storage** 탭 클릭
2. **Create Database** → **Postgres** 선택
3. 데이터베이스 이름 입력 후 생성
4. 자동으로 `POSTGRES_PRISMA_URL` 환경변수가 추가됩니다

### 3. 환경변수 설정

Vercel 대시보드에서:

1. 프로젝트 설정(Settings)으로 이동
2. "Environment Variables" 섹션으로 이동
3. 다음 환경변수를 확인/추가:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Google Gemini API 키
   - **Name**: `POSTGRES_PRISMA_URL` (Postgres 생성 시 자동 추가됨)
4. "Save" 클릭

**⚠️ 주의**: Vercel 환경변수에 API 키를 설정해야 합니다. `.env.local` 파일은 로컬 개발용입니다.

### 4. 배포

프로젝트가 자동으로 배포됩니다. 배포가 완료되면 제공된 URL로 접속할 수 있습니다.

**📚 자세한 설정 가이드:**
- 데이터베이스 설정: [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- Vercel 배포: [VERCEL_DATABASE.md](./VERCEL_DATABASE.md)

## 프로젝트 구조

```
chatbot/
├── app/
│   ├── api/
│   │   ├── news/          # 뉴스 검색 API (DB 저장)
│   │   ├── summarize/     # 뉴스 요약 API
│   │   ├── chat/          # 챗봇 API
│   │   └── searches/      # 검색 기록 조회 API
│   ├── layout.tsx         # 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── page.module.css    # 스타일
│   └── globals.css        # 전역 스타일
├── prisma/
│   └── schema.prisma      # 데이터베이스 스키마
├── lib/
│   └── prisma.ts          # Prisma 클라이언트
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

### GET /api/searches
검색 기록 목록을 조회합니다.

**Query Parameters:**
- `limit`: 조회할 개수 (기본값: 20)
- `keyword`: 키워드로 필터링 (선택)

**Response:**
```json
{
  "searches": [
    {
      "id": "검색_ID",
      "keyword": "검색_키워드",
      "createdAt": "검색_시간",
      "newsItems": [...]
    }
  ]
}
```

### GET /api/searches/[id]
특정 검색 기록을 조회합니다.

**Response:**
```json
{
  "search": {
    "id": "검색_ID",
    "keyword": "검색_키워드",
    "createdAt": "검색_시간",
    "newsItems": [...]
  }
}
```

## 라이선스

MIT
