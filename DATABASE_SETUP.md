# 데이터베이스 설정 가이드

## 📋 데이터베이스 구조

이 프로젝트는 Prisma + SQLite를 사용하여 검색 기록과 뉴스를 저장합니다.

### 데이터베이스 스키마

1. **Search (검색 기록)**
   - `id`: 고유 ID
   - `keyword`: 검색 키워드
   - `createdAt`: 검색 시간
   - `newsItems`: 관련 뉴스 목록

2. **NewsItem (뉴스 아이템)**
   - `id`: 고유 ID
   - `searchId`: 검색 기록 ID (외래키)
   - `title`: 뉴스 제목
   - `link`: 뉴스 링크
   - `snippet`: 뉴스 요약
   - `source`: 출처
   - `date`: 발행일
   - `createdAt`: 저장 시간

---

## 🚀 초기 설정

### 1단계: 의존성 설치

```bash
npm install
```

### 2단계: 환경변수 설정

`.env.local` 파일에 데이터베이스 URL 추가:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL="file:./dev.db"
```

### 3단계: Prisma 클라이언트 생성

```bash
npm run db:generate
```

### 4단계: 데이터베이스 생성 및 마이그레이션

```bash
npm run db:push
```

또는 마이그레이션 사용:

```bash
npm run db:migrate
```

### 5단계: 개발 서버 실행

```bash
npm run dev
```

---

## 📊 데이터베이스 관리

### Prisma Studio (GUI 도구)

데이터베이스를 시각적으로 관리할 수 있습니다:

```bash
npm run db:studio
```

브라우저에서 http://localhost:5555 접속

---

## 🔄 Vercel 배포 시 설정

### SQLite → PostgreSQL 전환 (권장)

Vercel에서는 SQLite 대신 PostgreSQL을 사용하는 것이 좋습니다.

#### 1. Vercel Postgres 추가

1. Vercel 대시보드 → 프로젝트 선택
2. **Storage** 탭 → **Create Database** → **Postgres** 선택
3. 데이터베이스 생성

#### 2. 환경변수 설정

Vercel에서 자동으로 `POSTGRES_PRISMA_URL`과 `POSTGRES_URL_NON_POOLING` 환경변수가 생성됩니다.

#### 3. Prisma 스키마 수정

`prisma/schema.prisma` 파일 수정:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

#### 4. 재배포

GitHub에 푸시하면 자동으로 재배포됩니다.

---

## 📝 API 엔드포인트

### GET /api/news?keyword=키워드
뉴스를 검색하고 데이터베이스에 저장합니다.

**Response:**
```json
{
  "news": [...],
  "searchId": "검색_기록_ID",
  "savedAt": "저장_시간"
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

### DELETE /api/searches/[id]
검색 기록을 삭제합니다.

---

## 🗂️ 파일 구조

```
chatbot/
├── prisma/
│   └── schema.prisma          # 데이터베이스 스키마
├── lib/
│   └── prisma.ts              # Prisma 클라이언트
├── app/
│   ├── api/
│   │   ├── news/              # 뉴스 검색 (DB 저장)
│   │   └── searches/          # 검색 기록 조회
│   └── page.tsx               # 프론트엔드 (검색 기록 표시)
└── dev.db                     # SQLite 데이터베이스 파일
```

---

## ⚠️ 주의사항

1. **데이터베이스 파일은 Git에 커밋하지 마세요**
   - `.gitignore`에 `*.db`가 포함되어 있습니다
   - Vercel 배포 시 PostgreSQL 사용 권장

2. **로컬 개발**
   - SQLite 사용 (간단하고 빠름)
   - `dev.db` 파일이 자동 생성됩니다

3. **프로덕션 배포**
   - PostgreSQL 사용 권장
   - Vercel Postgres 또는 외부 PostgreSQL 서비스 사용

---

## 🔧 문제 해결

### "Prisma Client has not been generated yet" 오류

```bash
npm run db:generate
```

### "Database does not exist" 오류

```bash
npm run db:push
```

### Vercel 배포 시 오류

1. PostgreSQL 데이터베이스 추가 확인
2. 환경변수 `POSTGRES_PRISMA_URL` 설정 확인
3. `prisma/schema.prisma`에서 `provider = "postgresql"` 확인
