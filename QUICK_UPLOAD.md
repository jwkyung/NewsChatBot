# 빠른 업로드 가이드 (newschatnot)

## ⚠️ Git 설치 필요

현재 시스템에 Git이 설치되어 있지 않습니다. 다음 중 하나를 선택하세요:

---

## 방법 1: Git 설치 후 자동 스크립트 실행 (가장 빠름)

### 1단계: Git 설치
- https://git-scm.com/download/win 접속
- 다운로드 후 설치 (기본 설정으로 진행)
- 설치 완료 후 **컴퓨터 재시작** 또는 **새 터미널** 열기

### 2단계: GitHub 저장소 생성
1. https://github.com/new 접속
2. Repository name: **newschatnot**
3. Public 또는 Private 선택
4. **Initialize with README 체크 해제** (중요!)
5. "Create repository" 클릭

### 3단계: 스크립트 실행
프로젝트 폴더에서 `upload-to-github.bat` 파일을 더블클릭하거나:

```bash
cd C:\Users\SD2-20\Desktop\chatbot
upload-to-github.bat
```

스크립트가 자동으로:
- Git 저장소 초기화
- 파일 추가 (.env.local 제외)
- 커밋 생성
- 원격 저장소 설정

### 4단계: 푸시
스크립트 실행 후 다음 명령어로 푸시:

```bash
git push -u origin main
```

**인증 필요 시:**
- GitHub Personal Access Token 사용
- 생성 방법: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- 권한: `repo` 체크

---

## 방법 2: GitHub Desktop 사용 (GUI 방식)

### 1단계: GitHub Desktop 설치
- https://desktop.github.com/ 접속
- 다운로드 및 설치
- GitHub 계정(jwkyung)으로 로그인

### 2단계: 저장소 생성 및 업로드
1. GitHub Desktop 실행
2. "File" → "Add Local Repository"
3. `C:\Users\SD2-20\Desktop\chatbot` 폴더 선택
4. "Publish repository" 클릭
5. Name: **newschatnot**
6. "Publish repository" 버튼 클릭

---

## 방법 3: 수동 명령어 (Git 설치 후)

```bash
cd C:\Users\SD2-20\Desktop\chatbot

# Git 초기화
git init

# 파일 추가
git add .

# 커밋 전 확인 (중요!)
git status
# .env.local이 목록에 없어야 합니다!

# 커밋
git commit -m "Initial commit: 뉴스 챗봇 프로젝트"

# 브랜치 이름 변경
git branch -M main

# 원격 저장소 추가
git remote add origin https://github.com/jwkyung/newschatnot.git

# 푸시
git push -u origin main
```

---

## ✅ 업로드 후 확인

1. https://github.com/jwkyung/newschatnot 접속
2. 파일들이 올바르게 업로드되었는지 확인
3. **`.env.local` 파일이 없는지 확인** (중요!)

---

## 🔒 보안 확인

업로드 전에 다음을 확인하세요:

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있음
- [ ] 코드에 하드코딩된 API 키가 없음
- [ ] `git status` 실행 시 `.env.local`이 목록에 없음

---

## 다음 단계: Vercel 배포

GitHub 업로드 완료 후:

1. https://vercel.com 접속
2. "New Project" 클릭
3. GitHub 저장소 `jwkyung/newschatnot` 선택
4. **Environment Variables**에 `GEMINI_API_KEY` 추가
5. "Deploy" 클릭
