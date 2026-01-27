# localhost:3000 연결 오류 해결 방법

## 🔴 문제: "사이트에 연결할 수 없음" (ERR_CONNECTION_REFUSED)

이 오류는 **로컬 개발 서버가 실행되지 않고 있다**는 의미입니다.

---

## ✅ 해결 방법

### 방법 1: 개발 서버 실행 (로컬에서 테스트)

#### 1단계: 프로젝트 폴더로 이동

```bash
cd C:\Users\SD2-20\Desktop\chatbot
```

#### 2단계: 개발 서버 실행

```bash
npm run dev
```

#### 3단계: 성공 메시지 확인

다음과 같은 메시지가 나타나야 합니다:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

#### 4단계: 브라우저에서 접속

- http://localhost:3000 접속
- 서버가 실행 중이어야 접속 가능합니다

**⚠️ 중요:** 서버를 종료하면(`Ctrl + C`) 다시 접속할 수 없습니다.

---

### 방법 2: Vercel에 배포 (실제 웹사이트)

GitHub에 업로드했으니 Vercel에 배포하면 실제 URL로 접속할 수 있습니다.

#### 1단계: Vercel 로그인

1. https://vercel.com 접속
2. GitHub 계정으로 로그인

#### 2단계: 프로젝트 가져오기

1. **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 선택
3. **`jwkyung/Newchatbot`** 저장소 선택
4. **"Import"** 클릭

#### 3단계: 환경변수 설정 (중요!)

1. **"Environment Variables"** 섹션 클릭
2. 다음 환경변수 추가:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: 실제 Google Gemini API 키
   - **Environment**: Production, Preview, Development 모두 체크
3. **"Save"** 클릭

#### 4단계: 배포

1. **"Deploy"** 버튼 클릭
2. 배포 완료 후 제공된 URL로 접속
   - 예: `https://newchatbot.vercel.app`

---

## 🔍 문제 진단

### 서버가 실행 중인지 확인

```bash
# Node.js 프로세스 확인
Get-Process -Name node -ErrorAction SilentlyContinue

# 포트 3000 사용 확인
netstat -ano | findstr ":3000"
```

### 다른 포트에서 실행 중일 수 있음

만약 포트 3000이 이미 사용 중이면 다른 포트로 실행됩니다:
```
- Local:        http://localhost:3001
```

이 경우 브라우저에서 해당 포트로 접속하세요.

---

## 🚨 자주 발생하는 문제

### 1. "npm run dev" 실행 시 오류

**원인:** 의존성이 설치되지 않음

**해결:**
```bash
npm install
npm run dev
```

### 2. 포트가 이미 사용 중

**원인:** 다른 프로그램이 3000번 포트 사용

**해결:**
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### 3. .env.local 파일 없음

**원인:** 환경변수가 설정되지 않음

**해결:**
1. 프로젝트 폴더에 `.env.local` 파일 생성
2. 다음 내용 추가:
```
GEMINI_API_KEY=여기에_API_키_입력
```

---

## 📋 체크리스트

로컬 서버 실행 전 확인:
- [ ] `npm install` 실행 완료
- [ ] `.env.local` 파일 생성 및 API 키 입력
- [ ] `npm run dev` 실행
- [ ] "Local: http://localhost:3000" 메시지 확인
- [ ] 브라우저에서 접속

---

## 💡 권장 사항

**로컬 개발:**
- `npm run dev` 실행 후 http://localhost:3000 접속

**실제 배포:**
- Vercel에 배포하여 실제 URL로 접속
- 더 안정적이고 어디서나 접속 가능

---

## 🎯 빠른 해결

지금 바로 실행하려면:

```bash
cd C:\Users\SD2-20\Desktop\chatbot
npm run dev
```

터미널에 "Local: http://localhost:3000"이 나타나면 브라우저에서 접속하세요!
