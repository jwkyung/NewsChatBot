# Vercel 환경변수 추가 완료 가이드

## ✅ 현재 준비된 것
- Prisma Accelerate URL (Prisma ORM.txt 파일에 있음)
- GEMINI_API_KEY (이미 Vercel에 추가됨)

---

## 📋 순차적 단계

### 1단계: Vercel에 POSTGRES_PRISMA_URL 추가

#### Prisma Accelerate URL 사용 (권장)

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속
   - 프로젝트 `news-chat-bot` 선택
   - Settings → Environment Variables

2. **"Add Environment Variable" 버튼 클릭**

3. **Key 필드에 입력:**
   ```
   POSTGRES_PRISMA_URL
   ```

4. **Value 필드에 입력:**
   Prisma ORM.txt 파일의 첫 번째 줄 전체를 복사:
   ```
   prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19LOXhxOGxiOFBUQWo1UUNZTzJackMiLCJhcGlfa2V5IjoiMDFLRzExUzJSWlRHMDVHRTBEUzlZWFAwWlEiLCJ0ZW5hbnRfaWQiOiJkODI2MTA3NzhjMjk2ZjMxN2U3MDQyMzEwNTIxYWRlNzFjMmY1ZTAxMzAwZDQzMGUxZDY0ZTA1ZTM1ZjVmMmE3IiwiaW50ZXJuYWxfc2VjcmV0IjoiYTQ1ZWRlYzktN2U3NC00YTNkLWFlNzgtNjg0NDBiZmExNWM4In0.rm9bOWT9U-p7h76CNQGCbcKNFUgnE2-GVvbeaHJGdPM
   ```

5. **Environments 선택:**
   - Production ✅
   - Preview ✅
   - Development ✅
   (모두 선택)

6. **Save 버튼 클릭**

---

### 2단계: 환경변수 확인

Vercel Environment Variables 목록에서 다음 두 개가 있는지 확인:

- ✅ `GEMINI_API_KEY` (이미 있음)
- ✅ `POSTGRES_PRISMA_URL` (방금 추가)

---

### 3단계: GitHub에 코드 푸시 확인

**확인:**
- https://github.com/jwkyung/NewsChatBot 접속
- 최신 코드가 업로드되어 있는지 확인

**아직 업로드하지 않았다면:**

#### 방법 1: GitHub Desktop (추천)
1. GitHub Desktop 실행
2. File → Add Local Repository
3. `C:\Users\SD2-20\Desktop\chatbot\github-upload` 폴더 선택
4. Summary 입력: `데이터베이스 기능 추가`
5. **Commit to main** 클릭
6. **Push origin** 클릭

#### 방법 2: GitHub 웹사이트
1. https://github.com/jwkyung/NewsChatBot 접속
2. **Add file → Upload files** 클릭
3. `github-upload` 폴더의 모든 파일 드래그 앤 드롭
4. **Commit changes** 클릭

---

### 4단계: Vercel 자동 배포 확인

1. **Vercel 대시보드 → Deployments 탭**
2. **배포 상태 확인:**
   - ✅ **Ready** (초록색) = 배포 성공
   - ⏳ **Building** = 배포 중 (잠시 기다림)
   - ❌ **Error** = 오류 발생 (로그 확인)

**GitHub에 푸시하면 자동으로 배포가 시작됩니다!**

---

### 5단계: 배포 로그 확인 (오류 시)

배포가 실패하면:

1. **Deployments → 최신 배포 클릭**
2. **Logs 탭 확인**
3. 오류 메시지 확인:
   - "Prisma Client has not been generated" → 정상 (자동 생성됨)
   - "Database connection failed" → `POSTGRES_PRISMA_URL` 확인
   - "GEMINI_API_KEY not found" → 환경변수 다시 확인

---

### 6단계: 배포 완료 후 테스트

배포가 성공하면:

1. **배포된 URL 확인**
   - Vercel 대시보드에서 배포된 사이트 URL 확인
   - 또는 https://news-chat-bot-two.vercel.app 접속

2. **기능 테스트:**
   - ✅ 뉴스 검색 테스트
   - ✅ 검색 기록 버튼 클릭 테스트
   - ✅ 이전 검색 내역 불러오기 테스트
   - ✅ 챗봇 기능 테스트

---

## ⚠️ 주의사항

### Prisma Accelerate URL vs Direct Postgres URL

**Prisma Accelerate URL 사용 (권장):**
- `prisma+postgres://accelerate.prisma-data.net/?api_key=...`
- 더 빠르고 안정적
- 연결 풀링 자동 관리

**Direct Postgres URL (대안):**
- `postgres://...@db.prisma.io:5432/postgres?sslmode=require`
- 직접 연결
- Prisma Accelerate보다 느릴 수 있음

**현재 설정:**
- Prisma Accelerate URL 사용 권장 ✅

---

## 🔧 문제 해결

### 환경변수가 저장되지 않아요
- Save 버튼을 클릭했는지 확인
- 페이지를 새로고침하고 다시 확인

### 배포가 실패해요
- Deployments → Logs에서 오류 확인
- 환경변수가 올바르게 입력되었는지 확인
- GitHub에 최신 코드가 푸시되었는지 확인

### 데이터베이스 연결 오류
- `POSTGRES_PRISMA_URL`이 정확히 입력되었는지 확인
- Prisma ORM.txt의 첫 번째 줄 전체를 복사했는지 확인

---

## ✅ 완료 체크리스트

- [ ] `POSTGRES_PRISMA_URL` 환경변수 추가 완료
- [ ] `GEMINI_API_KEY` 환경변수 확인
- [ ] GitHub에 코드 푸시 완료
- [ ] Vercel 자동 배포 시작됨
- [ ] 배포 성공 (Ready 상태)
- [ ] 배포된 사이트에서 기능 테스트 완료

---

## 🎉 완료!

모든 단계를 완료하면 뉴스 챗봇이 정상적으로 작동합니다!
