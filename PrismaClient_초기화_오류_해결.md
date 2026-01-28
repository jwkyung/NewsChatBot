# PrismaClientInitializationError 해결 가이드

## 🔍 발견된 오류

Vercel 로그에서 확인된 오류:
- ❌ `PrismaClientInitializationError: Invalid prisma.search.findMany() invocation`
- ❌ `PrismaClientInitializationError: Invalid prisma.search.create() invocation`

이것이 **검색 기록이 작동하지 않는 핵심 원인**입니다.

---

## 🎯 문제 원인

Prisma 클라이언트가 제대로 초기화되지 않았습니다.

가능한 원인:
1. **Prisma Client가 빌드 시 생성되지 않음**
2. **환경변수 문제**
3. **데이터베이스 연결 실패**
4. **Prisma 스키마와 데이터베이스 불일치**

---

## 🔧 해결 방법

### 1단계: package.json 확인

`package.json`에 다음 스크립트가 있는지 확인:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && next build"
  }
}
```

**확인:**
- ✅ `postinstall: "prisma generate"` - 있음
- ✅ `build: "prisma generate && next build"` - 있음

---

### 2단계: 환경변수 확인

**Vercel Settings → Environment Variables:**

1. `POSTGRES_PRISMA_URL` 확인
   - 값이 있는지 확인
   - Prisma ORM.txt 파일의 값과 일치하는지 확인

2. 환경변수 형식 확인:
   ```
   prisma+postgres://accelerate.prisma-data.net/?api_key=...
   ```

---

### 3단계: Prisma 스키마 확인

`prisma/schema.prisma` 파일 확인:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

**확인:**
- ✅ `provider = "postgresql"` - PostgreSQL 사용
- ✅ `url = env("POSTGRES_PRISMA_URL")` - 올바른 환경변수 사용

---

### 4단계: Vercel 빌드 로그 확인

**Vercel Deployments → 최신 배포 → Build Logs:**

다음 메시지 확인:
- ✅ "Running `prisma generate`" - Prisma Client 생성 중
- ✅ "Generated Prisma Client" - 생성 완료
- ❌ "Prisma Client has not been generated" - 생성 실패

---

## 🚀 즉시 해결 방법

### 방법 1: 환경변수 재확인 및 재배포

1. **Vercel Settings → Environment Variables**
2. **`POSTGRES_PRISMA_URL` 클릭하여 값 확인**
3. **Prisma ORM.txt 파일의 값과 일치하는지 확인**
4. **일치하지 않으면 수정**
5. **GitHub에 푸시하여 재배포**

### 방법 2: Prisma Client 강제 재생성

1. **로컬에서 테스트:**
   ```bash
   cd github-upload
   npm install
   npm run db:generate
   ```

2. **GitHub에 푸시:**
   - 수정된 파일 푸시
   - Vercel 자동 재배포

### 방법 3: Vercel에서 수동 재배포

1. **Vercel Deployments → 최신 배포**
2. **"Redeploy" 버튼 클릭**
3. **배포 완료 대기**

---

## 📋 체크리스트

- [ ] `package.json`에 `postinstall` 스크립트 확인
- [ ] `package.json`에 `build` 스크립트 확인
- [ ] `POSTGRES_PRISMA_URL` 환경변수 확인
- [ ] Prisma ORM.txt 값과 일치하는지 확인
- [ ] `prisma/schema.prisma`에서 `provider = "postgresql"` 확인
- [ ] Vercel 빌드 로그에서 Prisma generate 확인
- [ ] 재배포 완료 확인

---

## ⚠️ 추가 발견된 오류

### 1. API Key Leaked (403 Forbidden)

**오류:**
- `/api/summarize`: "Your API key was reported as leaked"

**해결:**
1. **새로운 Gemini API 키 발급**
2. **Vercel 환경변수에서 `GEMINI_API_KEY` 업데이트**
3. **재배포**

### 2. 401 Unauthorized

**오류:**
- `/api/chat`: 401 Unauthorized

**해결:**
- API 키 문제일 수 있음
- 위의 API 키 재발급으로 해결될 수 있음

---

## 🎯 우선순위

1. **PrismaClientInitializationError 해결** (최우선)
   - 검색 기록 기능 복구
2. **API Key 재발급**
   - 요약 및 챗봇 기능 복구

---

## 📞 다음 단계

1. **환경변수 `POSTGRES_PRISMA_URL` 재확인**
2. **Prisma ORM.txt 값과 일치하는지 확인**
3. **재배포 후 테스트**

문제가 계속되면:
- Vercel 빌드 로그의 구체적인 오류 메시지
- 환경변수 설정 스크린샷

이 정보들을 알려주시면 더 정확히 도와드릴 수 있습니다.
