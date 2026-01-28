# Vercel 환경변수 설정 가이드

## 🔴 현재 상황

Vercel 배포는 성공했지만 `GEMINI_API_KEY` 환경변수가 설정되지 않아 오류가 발생하고 있습니다.

---

## ✅ 해결 방법: Vercel 환경변수 설정

### 방법 1: Vercel 대시보드에서 설정 (가장 쉬움)

#### 1단계: Vercel 대시보드 접속

1. https://vercel.com 접속
2. 로그인 (GitHub 계정)

#### 2단계: 프로젝트 선택

1. 대시보드에서 **`news-chat-bot-two`** 프로젝트 클릭
2. 또는 프로젝트 목록에서 찾기

#### 3단계: Settings로 이동

1. 상단 메뉴에서 **"Settings"** 탭 클릭
2. 왼쪽 사이드바에서 **"Environment Variables"** 클릭

#### 4단계: 환경변수 추가

1. **"Add New"** 또는 **"Add"** 버튼 클릭
2. 다음 정보 입력:
   - **Key (이름)**: `GEMINI_API_KEY`
   - **Value (값)**: `AIzaSyC-fx5F5xNMjXDx7rPDsJIOGCZHNpA5NBs`
   - **Environment (환경)**: 
     - ✅ **Production** 체크
     - ✅ **Preview** 체크
     - ✅ **Development** 체크
     - **모두 체크하는 것을 권장합니다!**
3. **"Save"** 버튼 클릭

#### 5단계: 재배포

환경변수를 추가한 후 **반드시 재배포**해야 합니다:

1. 상단 메뉴에서 **"Deployments"** 탭 클릭
2. 가장 최근 배포를 찾아 **"..."** (점 3개) 메뉴 클릭
3. **"Redeploy"** 선택
4. **"Redeploy"** 버튼 클릭

또는:
- **"Deployments"** 탭에서 최근 배포를 클릭
- **"Redeploy"** 버튼 클릭

---

### 방법 2: Vercel CLI 사용

터미널에서 직접 설정할 수도 있습니다:

```bash
# Vercel CLI 설치 (아직 안 했다면)
npm install -g vercel

# 로그인
vercel login

# 프로젝트 폴더로 이동
cd C:\Users\SD2-20\Desktop\chatbot\github-upload

# 환경변수 추가
vercel env add GEMINI_API_KEY
```

프롬프트에 따라:
- **Value**: `AIzaSyC-fx5F5xNMjXDx7rPDsJIOGCZHNpA5NBs` 입력
- **Environment**: `production`, `preview`, `development` 모두 선택

---

## 📸 단계별 스크린샷 가이드

### 1. Settings → Environment Variables

```
Vercel 대시보드
  └─ 프로젝트 선택 (news-chat-bot-two)
     └─ Settings 탭
        └─ Environment Variables (왼쪽 사이드바)
```

### 2. 환경변수 추가 화면

```
┌─────────────────────────────────────┐
│ Environment Variables                │
├─────────────────────────────────────┤
│                                      │
│  Key:   [GEMINI_API_KEY        ]    │
│  Value: [AIzaSyC-fx5F5xNMj...  ]    │
│                                      │
│  Environment:                        │
│  ☑ Production                        │
│  ☑ Preview                           │
│  ☑ Development                       │
│                                      │
│  [Cancel]  [Save]                    │
└─────────────────────────────────────┘
```

---

## ⚠️ 중요 사항

### 1. 재배포 필수!

환경변수를 추가한 후 **반드시 재배포**해야 합니다.
- 환경변수만 추가하고 재배포하지 않으면 적용되지 않습니다!

### 2. 모든 환경에 추가

- **Production**: 실제 배포된 사이트
- **Preview**: Pull Request 미리보기
- **Development**: 개발 환경

**권장**: 세 가지 모두 체크하세요!

### 3. API 키 확인

현재 사용 중인 API 키:
```
AIzaSyC-fx5F5xNMjXDx7rPDsJIOGCZHNpA5NBs
```

이 키를 Vercel 환경변수에 입력하세요.

---

## ✅ 설정 후 확인

### 1. 재배포 완료 확인

1. **Deployments** 탭에서 배포 상태 확인
2. ✅ "Ready" 상태가 되면 완료

### 2. 사이트 테스트

1. 배포된 URL 접속: `https://news-chat-bot-two.vercel.app`
2. 뉴스 검색 테스트
3. 요약 기능 테스트
4. 챗봇 기능 테스트

**오류가 사라지고 정상 작동해야 합니다!**

---

## 🐛 문제 해결

### "여전히 오류가 발생합니다"

**확인 사항:**
1. 환경변수 이름이 정확한지 확인: `GEMINI_API_KEY` (대소문자 구분)
2. 재배포를 했는지 확인
3. 모든 환경(Production, Preview, Development)에 추가했는지 확인

**해결 방법:**
1. 환경변수 삭제 후 다시 추가
2. 재배포

### "환경변수를 찾을 수 없습니다"

**확인 사항:**
1. 올바른 프로젝트에 추가했는지 확인
2. Settings → Environment Variables에서 목록 확인

---

## 📝 빠른 체크리스트

- [ ] Vercel 대시보드 접속
- [ ] 프로젝트 선택 (news-chat-bot-two)
- [ ] Settings → Environment Variables
- [ ] Key: `GEMINI_API_KEY` 추가
- [ ] Value: `AIzaSyC-fx5F5xNMjXDx7rPDsJIOGCZHNpA5NBs` 입력
- [ ] Production, Preview, Development 모두 체크
- [ ] Save 클릭
- [ ] Deployments → Redeploy 클릭
- [ ] 배포 완료 후 사이트 테스트

---

## 🎯 요약

1. **Vercel 대시보드** → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. **Add New** → Key: `GEMINI_API_KEY`, Value: API 키 입력
4. **모든 환경 체크** → **Save**
5. **Deployments** → **Redeploy**

이렇게 하면 오류가 해결됩니다!
