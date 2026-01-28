# GitHub 및 Vercel 업데이트 가이드

## 📋 업데이트 내용

데이터베이스 기능이 추가되었습니다:
- ✅ 뉴스 검색 시 자동으로 DB에 저장
- ✅ 검색 기록 조회 기능
- ✅ Prisma + SQLite (로컬) / PostgreSQL (Vercel)

---

## 🚀 GitHub에 업데이트하는 방법

### 방법 1: GitHub Desktop 사용 (추천)

1. **GitHub Desktop 열기**
2. **File → Add Local Repository** 클릭
3. `C:\Users\SD2-20\Desktop\chatbot\github-upload` 폴더 선택
4. 변경사항 확인:
   - 새로 추가된 파일들 확인
   - 수정된 파일들 확인
5. **Commit message** 입력:
   ```
   데이터베이스 기능 추가: 검색 기록 저장 및 조회 기능
   ```
6. **Commit to main** 클릭
7. **Push origin** 클릭

### 방법 2: GitHub 웹사이트에서 직접 업로드

1. https://github.com/jwkyung/NewsChatBot 접속
2. **Add file → Upload files** 클릭
3. `github-upload` 폴더의 모든 파일을 드래그 앤 드롭
4. **Commit changes** 클릭

### 방법 3: Git 명령어 사용 (Git 설치된 경우)

```bash
cd C:\Users\SD2-20\Desktop\chatbot\github-upload
git add .
git commit -m "데이터베이스 기능 추가: 검색 기록 저장 및 조회 기능"
git push origin main
```

---

## ⚠️ Vercel 배포 전 필수 설정

### 1. Vercel Postgres 데이터베이스 생성

Vercel에서는 SQLite가 작동하지 않으므로 **PostgreSQL을 사용해야 합니다.**

1. Vercel 대시보드 접속: https://vercel.com
2. 프로젝트 선택: `news-chat-bot`
3. **Storage** 탭 클릭
4. **Create Database** → **Postgres** 선택
5. 데이터베이스 이름 입력 (예: `newschatbot-db`)
6. **Create** 클릭

### 2. Prisma 스키마 수정

GitHub에 푸시하기 전에 `prisma/schema.prisma` 파일을 수정해야 합니다:

**현재 (SQLite):**
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**수정 후 (PostgreSQL):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

### 3. 환경변수 확인

Vercel Postgres를 생성하면 자동으로 다음 환경변수가 추가됩니다:
- `POSTGRES_PRISMA_URL` ✅
- `POSTGRES_URL_NON_POOLING` ✅

기존 환경변수:
- `GEMINI_API_KEY` ✅

---

## 📝 업데이트할 파일 목록

### 새로 추가된 파일
- `prisma/schema.prisma` - 데이터베이스 스키마
- `lib/prisma.ts` - Prisma 클라이언트
- `app/api/searches/route.ts` - 검색 기록 조회 API
- `app/api/searches/[id]/route.ts` - 특정 검색 기록 조회/삭제 API
- `DATABASE_SETUP.md` - 데이터베이스 설정 가이드
- `README_DATABASE.md` - 데이터베이스 기능 설명
- `VERCEL_DATABASE.md` - Vercel 데이터베이스 설정 가이드

### 수정된 파일
- `package.json` - Prisma 의존성 추가, 빌드 스크립트 수정
- `app/api/news/route.ts` - DB 저장 기능 추가
- `app/page.tsx` - 검색 기록 UI 추가
- `app/page.module.css` - 검색 기록 스타일 추가
- `.env.example` - DATABASE_URL 추가
- `.gitignore` - 데이터베이스 파일 제외 추가

---

## ✅ 업데이트 체크리스트

### GitHub 업로드 전
- [ ] `prisma/schema.prisma`에서 `provider = "postgresql"`로 수정
- [ ] 모든 새 파일이 `github-upload` 폴더에 있는지 확인
- [ ] `.env.local` 파일이 포함되지 않았는지 확인
- [ ] `*.db` 파일이 포함되지 않았는지 확인

### Vercel 배포 전
- [ ] Vercel Postgres 데이터베이스 생성 완료
- [ ] `POSTGRES_PRISMA_URL` 환경변수 확인
- [ ] `GEMINI_API_KEY` 환경변수 확인
- [ ] GitHub에 푸시 완료
- [ ] Vercel 자동 배포 완료 확인

---

## 🔧 문제 해결

### "Prisma Client has not been generated" 오류

**해결:**
1. `package.json`에 `postinstall: "prisma generate"` 확인
2. Vercel 배포 로그에서 Prisma generate 실행 확인

### "Database does not exist" 오류

**해결:**
1. Vercel Postgres가 생성되었는지 확인
2. `POSTGRES_PRISMA_URL` 환경변수 확인
3. `prisma/schema.prisma`에서 `provider = "postgresql"` 확인

### 빌드 실패

**확인 사항:**
1. Prisma 스키마 문법 오류 확인
2. 환경변수 설정 확인
3. `package.json`의 `build` 스크립트 확인

---

## 📞 참고

- GitHub 저장소: https://github.com/jwkyung/NewsChatBot
- Vercel 배포: https://vercel.com/iboys-projects-eff32016/news-chat-bot
- 자세한 설정: `DATABASE_SETUP.md`, `VERCEL_DATABASE.md` 참고
