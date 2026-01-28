# Vercel 데이터베이스 설정 가이드

## ⚠️ 중요: Vercel에서는 PostgreSQL 필수!

Vercel의 서버리스 환경에서는 SQLite가 작동하지 않습니다. **PostgreSQL을 사용해야 합니다.**

---

## 🚀 Vercel Postgres 설정

### 1단계: Vercel Postgres 추가

1. Vercel 대시보드 → 프로젝트 선택
2. **Storage** 탭 클릭
3. **Create Database** 버튼 클릭
4. **Postgres** 선택
5. 데이터베이스 이름 입력 (예: `newschatbot-db`)
6. **Create** 클릭

### 2단계: 환경변수 확인

Vercel Postgres를 생성하면 자동으로 다음 환경변수가 추가됩니다:
- `POSTGRES_PRISMA_URL` (Prisma용)
- `POSTGRES_URL_NON_POOLING` (마이그레이션용)

### 3단계: Prisma 스키마 수정

`prisma/schema.prisma` 파일을 수정:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

### 4단계: GitHub에 푸시

수정된 파일을 GitHub에 푸시하면 자동으로 재배포됩니다.

### 5단계: 데이터베이스 마이그레이션

배포 후 첫 실행 시 자동으로 테이블이 생성됩니다.

또는 Vercel 대시보드에서:
1. **Deployments** → 최신 배포 선택
2. **Functions** 탭에서 로그 확인
3. 오류가 없으면 성공!

---

## 📝 수정해야 할 파일

### prisma/schema.prisma

```prisma
datasource db {
  provider = "postgresql"  // sqlite → postgresql 변경
  url      = env("POSTGRES_PRISMA_URL")  // DATABASE_URL → POSTGRES_PRISMA_URL 변경
}
```

---

## ✅ 체크리스트

배포 전 확인:
- [ ] Vercel Postgres 데이터베이스 생성 완료
- [ ] `POSTGRES_PRISMA_URL` 환경변수 확인
- [ ] `prisma/schema.prisma`에서 `provider = "postgresql"` 확인
- [ ] `package.json`에 `postinstall: "prisma generate"` 추가 확인
- [ ] GitHub에 푸시 완료
- [ ] 배포 후 로그에서 오류 없음 확인

---

## 🔧 문제 해결

### "Prisma Client has not been generated" 오류

**해결:**
1. `package.json`에 `postinstall` 스크립트 추가 확인
2. Vercel 대시보드 → Settings → Build & Development Settings
3. **Install Command**에 `prisma generate` 추가 (선택사항)

### "Database does not exist" 오류

**해결:**
1. Vercel Postgres가 생성되었는지 확인
2. 환경변수 `POSTGRES_PRISMA_URL` 확인
3. 배포 로그에서 연결 오류 확인

### 빌드 실패

**확인 사항:**
1. Prisma 스키마 문법 오류 확인
2. 환경변수 설정 확인
3. `package.json`의 `build` 스크립트 확인

---

## 💡 팁

- 로컬 개발: SQLite 사용 (간단)
- Vercel 배포: PostgreSQL 사용 (필수)
- 두 환경 모두 동일한 Prisma 스키마 사용 가능
