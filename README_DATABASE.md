# 데이터베이스 기능 추가 완료

## ✅ 구현된 기능

1. **뉴스 검색 시 자동 저장**
   - 검색한 키워드와 뉴스가 자동으로 데이터베이스에 저장됩니다
   - 검색 기록은 영구 보관됩니다

2. **검색 기록 조회**
   - "검색 기록" 버튼 클릭 시 이전 검색 내역 확인 가능
   - 검색 기록 클릭 시 해당 뉴스 다시 불러오기

3. **데이터베이스 구조**
   - Search: 검색 키워드와 시간 저장
   - NewsItem: 뉴스 제목, 링크, 내용, 출처 저장

---

## 🚀 초기 설정 (로컬 개발)

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일에 추가:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL="file:./dev.db"
```

### 3. 데이터베이스 초기화

```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 생성
npm run db:push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

---

## 📊 Vercel 배포 시 설정

### SQLite → PostgreSQL 전환 (필수)

Vercel에서는 SQLite가 작동하지 않으므로 PostgreSQL을 사용해야 합니다.

#### 1. Vercel Postgres 추가

1. Vercel 대시보드 → 프로젝트 선택
2. **Storage** 탭 → **Create Database** → **Postgres** 선택
3. 데이터베이스 생성

#### 2. Prisma 스키마 수정

`prisma/schema.prisma` 파일 수정:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

#### 3. 환경변수 확인

Vercel에서 자동으로 다음 환경변수가 생성됩니다:
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

#### 4. 빌드 스크립트 추가

`package.json`의 `build` 스크립트 수정:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

#### 5. 재배포

GitHub에 푸시하면 자동으로 재배포됩니다.

---

## 📝 새로운 API 엔드포인트

### GET /api/searches
검색 기록 목록 조회

**Query Parameters:**
- `limit`: 조회할 개수 (기본값: 20)
- `keyword`: 키워드로 필터링

### GET /api/searches/[id]
특정 검색 기록 조회

### DELETE /api/searches/[id]
검색 기록 삭제

---

## 🎯 사용 방법

1. 뉴스 검색 → 자동으로 DB에 저장
2. "검색 기록" 버튼 클릭 → 이전 검색 내역 확인
3. 검색 기록 클릭 → 해당 뉴스 다시 불러오기

---

## ⚠️ 중요 사항

- 로컬 개발: SQLite 사용 (`dev.db` 파일)
- Vercel 배포: PostgreSQL 사용 필수
- 데이터베이스 파일(`*.db`)은 Git에 커밋되지 않습니다
