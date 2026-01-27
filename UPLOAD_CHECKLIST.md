# Git 업로드 체크리스트

## ✅ 업로드해야 할 파일들

### 필수 파일 (반드시 업로드)
```
✅ app/
   ✅ api/
      ✅ chat/route.ts
      ✅ news/route.ts
      ✅ summarize/route.ts
   ✅ globals.css
   ✅ layout.tsx
   ✅ page.module.css
   ✅ page.tsx

✅ .env.example          (예제 파일, 실제 키 없음)
✅ .gitignore           (중요! API 키 파일 제외 설정)
✅ next.config.js
✅ package.json
✅ package-lock.json    (있다면)
✅ tsconfig.json
✅ vercel.json
✅ README.md
```

### 선택 파일 (업로드해도 됨)
```
📄 DEPLOY.md
📄 GIT_UPLOAD.md
📄 QUICK_UPLOAD.md
📄 실행방법.md
📄 upload-to-github.bat
```

---

## ❌ 절대 업로드하면 안 되는 파일들

### 🔴 API 키 포함 파일 (중요!)
```
❌ .env.local              ← API 키가 들어있음! 절대 업로드 금지!
❌ .env
❌ .env.development.local
❌ .env.test.local
❌ .env.production.local
```

### 🔴 빌드/의존성 파일 (자동 생성됨)
```
❌ node_modules/          ← npm install로 재생성 가능
❌ .next/                  ← 빌드 시 자동 생성
❌ /out/                   ← 빌드 출력 폴더
❌ /build/                 ← 빌드 폴더
❌ .vercel/                ← Vercel 설정 (로컬)
```

### 🔴 기타 제외 파일
```
❌ *.tsbuildinfo
❌ next-env.d.ts
❌ npm-debug.log*
❌ yarn-debug.log*
❌ yarn-error.log*
❌ .DS_Store
❌ *.pem
```

---

## 🔒 업로드 전 최종 확인

### 1단계: .env.local 확인
```bash
# 터미널에서 실행
git status
```
**확인사항:** `.env.local`이 목록에 **없어야** 합니다!

### 2단계: 코드에 하드코딩된 키 확인
```bash
# 프로젝트 폴더에서 실행
grep -r "AIzaSy" . --exclude-dir=node_modules
```
**확인사항:** 결과가 나오면 안 됩니다! (DEPLOY.md의 예제는 괜찮음)

### 3단계: .gitignore 확인
`.gitignore` 파일에 다음이 포함되어 있는지 확인:
```
.env*.local
.env
.env.local
```

---

## 📋 업로드 순서

### 방법 1: Git 명령어 사용

```bash
cd C:\Users\SD2-20\Desktop\chatbot

# 1. Git 초기화
git init

# 2. 파일 추가 (.gitignore에 따라 자동으로 제외됨)
git add .

# 3. 확인 (중요!)
git status
# .env.local이 목록에 없어야 함!

# 4. 커밋
git commit -m "Initial commit: 뉴스 챗봇 프로젝트"

# 5. 브랜치 이름 변경
git branch -M main

# 6. 원격 저장소 추가
git remote add origin https://github.com/jwkyung/newschatnot.git

# 7. 푸시
git push -u origin main
```

### 방법 2: 자동 스크립트 사용
```bash
# 프로젝트 폴더에서
upload-to-github.bat
```

---

## ✅ 업로드 후 확인

1. https://github.com/jwkyung/newschatnot 접속
2. 파일 목록 확인
3. **`.env.local` 파일이 없는지 확인** (가장 중요!)
4. 코드 파일들이 모두 있는지 확인

---

## 🚨 만약 실수로 .env.local을 업로드했다면

### 즉시 조치:
1. **API 키 재발급** (Google AI Studio에서)
2. Git에서 제거:
   ```bash
   git rm --cached .env.local
   git commit -m "Remove .env.local from tracking"
   git push
   ```
3. GitHub에서도 삭제되었는지 확인

---

## 📝 요약

### 업로드 O (필수)
- ✅ 모든 소스 코드 (app/ 폴더)
- ✅ 설정 파일들 (package.json, tsconfig.json 등)
- ✅ 문서 파일들 (README.md 등)
- ✅ .gitignore
- ✅ .env.example (실제 키 없음)

### 업로드 X (절대 금지)
- ❌ .env.local (API 키 포함!)
- ❌ node_modules/
- ❌ .next/
- ❌ 빌드 파일들

**핵심:** `.gitignore`가 올바르게 설정되어 있으면 `git add .` 실행 시 자동으로 제외됩니다!
