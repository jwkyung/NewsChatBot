# 배포 가이드

## Git에 업로드하기 전 확인사항

### ✅ 필수 확인 항목

1. **`.env.local` 파일이 Git에 포함되지 않았는지 확인**
   ```bash
   git status
   ```
   - `.env.local` 파일이 목록에 나타나면 안 됩니다
   - 나타나면 다음 명령어로 제거:
     ```bash
     git rm --cached .env.local
     ```

2. **`.gitignore` 파일 확인**
   - `.env*.local`과 `.env`가 포함되어 있는지 확인
   - 포함되어 있지 않으면 추가해야 합니다

3. **코드에 하드코딩된 API 키 확인**
   - 모든 API 키는 `process.env.GEMINI_API_KEY`로만 사용되어야 합니다
   - 코드에 실제 API 키 문자열이 있는지 검색:
     ```bash
     grep -r "AIzaSy" . --exclude-dir=node_modules
     ```
   - 결과가 나오면 제거해야 합니다

## Git 초기화 및 업로드

### 1. Git 저장소 초기화

```bash
git init
```

### 2. 파일 추가 (`.env.local`은 자동으로 제외됨)

```bash
git add .
```

### 3. 커밋 전 최종 확인

```bash
git status
```

**확인사항:**
- `.env.local` 파일이 목록에 없어야 함
- `.env.example` 파일만 있어야 함

### 4. 커밋

```bash
git commit -m "Initial commit: 뉴스 챗봇 프로젝트"
```

### 5. GitHub에 저장소 생성 및 푸시

1. GitHub에서 새 저장소 생성
2. 원격 저장소 추가:
   ```bash
   git remote add origin https://github.com/사용자명/저장소명.git
   ```
3. 푸시:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Vercel 배포 시 환경변수 설정

GitHub에 푸시한 후 Vercel에서:

1. 프로젝트를 Vercel에 연결
2. **Settings → Environment Variables**로 이동
3. 다음 환경변수 추가:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: 실제 API 키 (`.env.local`에 있는 값)
   - **Environment**: Production, Preview, Development 모두 선택
4. 저장 후 재배포

## 문제 해결

### API 키가 실수로 커밋된 경우

1. **즉시 API 키 재발급** (Google AI Studio에서)
2. Git 히스토리에서 제거:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. 강제 푸시 (주의: 팀원과 협의 필요):
   ```bash
   git push origin --force --all
   ```

### `.env.local`이 추적되고 있는 경우

```bash
git rm --cached .env.local
git commit -m "Remove .env.local from tracking"
```
