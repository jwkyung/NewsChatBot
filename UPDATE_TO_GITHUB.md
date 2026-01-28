# GitHub 및 Vercel 업데이트 가이드

## 🎯 업데이트 목표

데이터베이스 기능이 추가된 코드를 다음에 업데이트:
- GitHub: https://github.com/jwkyung/NewsChatBot
- Vercel: https://vercel.com/iboys-projects-eff32016/news-chat-bot

---

## 📋 업데이트 내용

### 새로 추가된 기능
- ✅ 뉴스 검색 시 자동으로 데이터베이스에 저장
- ✅ 검색 기록 조회 기능
- ✅ 이전 검색 내역 다시 불러오기

### 새로 추가된 파일
- `prisma/schema.prisma` - 데이터베이스 스키마 (PostgreSQL 설정)
- `lib/prisma.ts` - Prisma 클라이언트
- `app/api/searches/` - 검색 기록 API
- `DATABASE_SETUP.md` - 데이터베이스 설정 가이드
- `VERCEL_DATABASE.md` - Vercel 데이터베이스 설정 가이드

### 수정된 파일
- `package.json` - Prisma 의존성 추가
- `app/api/news/route.ts` - DB 저장 기능 추가
- `app/page.tsx` - 검색 기록 UI 추가
- `README.md` - 데이터베이스 기능 설명 추가

---

## 🚀 GitHub에 업로드하는 방법

### 방법 1: GitHub Desktop 사용 (가장 쉬움)

1. **GitHub Desktop 실행**
2. **File → Add Local Repository** 클릭
3. `C:\Users\SD2-20\Desktop\chatbot\github-upload` 폴더 선택
4. 변경사항 확인:
   - 새 파일들 확인
   - 수정된 파일들 확인
5. 왼쪽 하단에 **Summary** 입력:
   ```
   데이터베이스 기능 추가: 검색 기록 저장 및 조회
   ```
6. **Commit to main** 클릭
7. 상단 메뉴에서 **Push origin** 클릭

### 방법 2: GitHub 웹사이트에서 직접 업로드

1. https://github.com/jwkyung/NewsChatBot 접속
2. **Add file → Upload files** 클릭
3. `github-upload` 폴더의 모든 파일을 드래그 앤 드롭
4. **Commit changes** 메시지 입력:
   ```
   데이터베이스 기능 추가: 검색 기록 저장 및 조회
   ```
5. **Commit changes** 버튼 클릭

### 방법 3: Git 명령어 (Git 설치된 경우)

```bash
cd C:\Users\SD2-20\Desktop\chatbot\github-upload
git add .
git commit -m "데이터베이스 기능 추가: 검색 기록 저장 및 조회"
git push origin main
```

---

## ⚠️ Vercel 배포 전 필수 작업

### 1. Vercel Postgres 데이터베이스 생성 (필수!)

Vercel에서는 SQLite가 작동하지 않으므로 **PostgreSQL을 반드시 사용해야 합니다.**

1. https://vercel.com 접속 및 로그인
2. 프로젝트 `news-chat-bot` 선택
3. 상단 메뉴에서 **Storage** 탭 클릭
4. **Create Database** 버튼 클릭
5. **Postgres** 선택
6. 데이터베이스 이름 입력 (예: `newschatbot-db`)
7. **Create** 클릭

✅ Postgres를 생성하면 자동으로 다음 환경변수가 추가됩니다:
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### 2. 환경변수 확인

Vercel 대시보드 → Settings → Environment Variables에서 확인:

- ✅ `GEMINI_API_KEY` - Google Gemini API 키
- ✅ `POSTGRES_PRISMA_URL` - Postgres 생성 시 자동 추가됨

### 3. GitHub 푸시 후 자동 배포

GitHub에 푸시하면 Vercel이 자동으로:
1. 코드를 가져옴
2. `npm install` 실행
3. `prisma generate` 실행 (postinstall 스크립트)
4. `next build` 실행
5. 배포 완료

---

## ✅ 체크리스트

### GitHub 업로드 전
- [x] `prisma/schema.prisma`에서 `provider = "postgresql"` 확인
- [x] 모든 새 파일이 `github-upload` 폴더에 있는지 확인
- [x] `.env.local` 파일이 포함되지 않았는지 확인
- [x] `*.db` 파일이 포함되지 않았는지 확인

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
1. `package.json`에 `postinstall: "prisma generate"` 확인 ✅
2. Vercel 배포 로그에서 Prisma generate 실행 확인

### "Database does not exist" 오류

**해결:**
1. Vercel Postgres가 생성되었는지 확인
2. `POSTGRES_PRISMA_URL` 환경변수 확인
3. `prisma/schema.prisma`에서 `provider = "postgresql"` 확인 ✅

### 빌드 실패

**확인 사항:**
1. Prisma 스키마 문법 오류 확인
2. 환경변수 설정 확인
3. `package.json`의 `build` 스크립트 확인 ✅

---

## 📞 참고 링크

- GitHub 저장소: https://github.com/jwkyung/NewsChatBot
- Vercel 배포: https://vercel.com/iboys-projects-eff32016/news-chat-bot
- 자세한 설정: `DATABASE_SETUP.md`, `VERCEL_DATABASE.md` 참고

---

## 🎉 완료 후 확인

1. GitHub 저장소에 모든 파일이 업로드되었는지 확인
2. Vercel 배포가 성공했는지 확인
3. 배포된 사이트에서 뉴스 검색 테스트
4. "검색 기록" 버튼 클릭하여 기능 확인
