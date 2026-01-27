@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 업로드 스크립트
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] Git 저장소 초기화 중...
git init
if errorlevel 1 (
    echo 오류: Git이 설치되어 있지 않습니다.
    echo https://git-scm.com/download/win 에서 Git을 설치해주세요.
    pause
    exit /b 1
)

echo [2/6] 파일 추가 중... (.env.local은 자동으로 제외됨)
git add .

echo [3/6] 커밋 전 확인...
echo.
echo === 다음 파일들이 커밋됩니다 ===
git status --short
echo.
echo === .env.local이 위 목록에 없어야 합니다! ===
pause

echo [4/6] 커밋 생성 중...
git commit -m "Initial commit: 뉴스 챗봇 프로젝트"

echo [5/6] 브랜치 이름을 main으로 변경...
git branch -M main

echo [6/6] 원격 저장소 설정...
git remote remove origin 2>nul
git remote add origin https://github.com/jwkyung/newschatnot.git

echo.
echo ========================================
echo 준비 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. GitHub에서 저장소를 먼저 생성하세요: https://github.com/new
echo    - Repository name: newschatnot
echo    - Initialize with README 체크 해제
echo.
echo 2. 아래 명령어로 푸시하세요:
echo    git push -u origin main
echo.
echo 3. GitHub 인증이 필요합니다 (Personal Access Token 사용 권장)
echo.
pause
