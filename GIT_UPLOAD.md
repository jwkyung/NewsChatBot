# GitHub 업로드 가이드

## 1단계: Git 설치

### 방법 1: Git 공식 사이트에서 설치 (권장)
1. https://git-scm.com/download/win 접속
2. 다운로드한 설치 파일 실행
3. 기본 설정으로 설치 진행
4. 설치 완료 후 **새 터미널** 열기

### 방법 2: GitHub Desktop 사용
1. https://desktop.github.com/ 접속
2. GitHub Desktop 다운로드 및 설치
3. GitHub 계정으로 로그인

---

## 2단계: GitHub 저장소 생성

1. https://github.com/jwkyung 접속
2. 우측 상단 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 정보 입력:
   - **Repository name**: `newschatnot`
   - **Description**: (선택사항) 뉴스 챗봇 프로젝트
   - **Public** 또는 **Private** 선택
   - **Initialize this repository with a README** 체크 해제 (이미 README가 있음)
4. "Create repository" 클릭

---

## 3단계: 프로젝트 업로드

### Git 명령어 사용 (터미널)

```bash
# 프로젝트 폴더로 이동
cd C:\Users\SD2-20\Desktop\chatbot

# Git 저장소 초기화
git init

# 모든 파일 추가 (.env.local은 자동으로 제외됨)
git add .

# 커밋 전 확인 (중요!)
git status
# .env.local이 목록에 없어야 합니다!

# 커밋
git commit -m "Initial commit: 뉴스 챗봇 프로젝트"

# 브랜치 이름을 main으로 변경
git branch -M main

# 원격 저장소 추가
git remote add origin https://github.com/jwkyung/newschatnot.git

# GitHub에 푸시
git push -u origin main
```

**인증 방법:**
- Personal Access Token 사용 (권장)
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. "Generate new token" 클릭
  3. 권한 선택: `repo` 체크
  4. 토큰 생성 후 복사
  5. `git push` 실행 시 비밀번호 대신 토큰 입력

---

### GitHub Desktop 사용

1. GitHub Desktop 실행
2. "File" → "Add Local Repository" 클릭
3. `C:\Users\SD2-20\Desktop\chatbot` 폴더 선택
4. "Publish repository" 클릭
5. 저장소 이름: `newschatnot`
6. "Publish repository" 버튼 클릭

---

## 4단계: 확인

1. https://github.com/jwkyung/newschatnot 접속
2. 파일들이 올바르게 업로드되었는지 확인
3. **`.env.local` 파일이 없는지 확인** (중요!)

---

## 문제 해결

### "git: command not found" 오류
- Git이 설치되지 않았거나 PATH에 등록되지 않음
- Git 설치 후 터미널 재시작

### "Permission denied" 오류
- GitHub 인증이 필요함
- Personal Access Token 생성 및 사용

### ".env.local"이 업로드된 경우
```bash
git rm --cached .env.local
git commit -m "Remove .env.local from tracking"
git push
```

---

## 다음 단계: Vercel 배포

GitHub에 업로드한 후:
1. https://vercel.com 접속
2. "New Project" 클릭
3. GitHub 저장소 `jwkyung/newschatnot` 선택
4. **Environment Variables**에 `GEMINI_API_KEY` 추가
5. "Deploy" 클릭
