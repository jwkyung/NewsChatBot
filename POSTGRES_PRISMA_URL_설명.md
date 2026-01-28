# POSTGRES_PRISMA_URL 설명

## 📖 POSTGRES_PRISMA_URL이란?

`POSTGRES_PRISMA_URL`은 **환경변수의 이름(Key)**입니다.

이 변수에 **Prisma가 데이터베이스에 연결하기 위한 주소(URL)**를 저장합니다.

---

## 🔍 구체적으로 설명하면

### 환경변수란?
프로그램이 실행될 때 필요한 설정값을 저장하는 변수입니다.

### POSTGRES_PRISMA_URL의 역할
- **이름**: `POSTGRES_PRISMA_URL` (환경변수 이름)
- **값**: 데이터베이스 연결 문자열 (Prisma ORM.txt 파일의 2번째 줄)

---

## 📝 실제 예시

### Key (환경변수 이름)
```
POSTGRES_PRISMA_URL
```
- 이것은 **변수 이름**입니다
- 프로그램에서 이 이름으로 데이터베이스 주소를 찾습니다

### Value (실제 연결 문자열)
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- 이것은 **실제 데이터베이스 주소**입니다
- Prisma ORM.txt 파일의 2번째 줄 전체를 복사한 값입니다

---

## 🎯 비유로 설명하면

**POSTGRES_PRISMA_URL**은:
- **우편함 이름** = `POSTGRES_PRISMA_URL` (Key)
- **우편함 안의 편지** = 연결 문자열 (Value)

프로그램이 "POSTGRES_PRISMA_URL 우편함을 열어봐"라고 하면, 그 안에 있는 연결 문자열을 가져와서 데이터베이스에 연결합니다.

---

## ✅ Vercel에 입력하는 방법

### Key 필드에 입력:
```
POSTGRES_PRISMA_URL
```
(단순히 이 텍스트만 입력)

### Value 필드에 입력:
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19LOXhxOGxiOFBUQWo1UUNZTzJackMiLCJhcGlfa2V5IjoiMDFLRzExUzJSWlRHMDVHRTBEUzlZWFAwWlEiLCJ0ZW5hbnRfaWQiOiJkODI2MTA3NzhjMjk2ZjMxN2U3MDQyMzEwNTIxYWRlNzFjMmY1ZTAxMzAwZDQzMGUxZDY0ZTA1ZTM1ZjVmMmE3IiwiaW50ZXJuYWxfc2VjcmV0IjoiYTQ1ZWRlYzktN2U3NC00YTNkLWFlNzgtNjg0NDBiZmExNWM4In0.rm9bOWT9U-p7h76CNQGCbcKNFUgnE2-GVvbeaHJGdPM
```
(Prisma ORM.txt 파일의 2번째 줄 전체를 복사)

---

## 🔧 왜 필요한가요?

1. **보안**: 데이터베이스 연결 정보를 코드에 직접 넣지 않습니다
2. **유연성**: 개발/프로덕션 환경마다 다른 데이터베이스를 사용할 수 있습니다
3. **관리**: 환경변수만 변경하면 다른 데이터베이스로 쉽게 전환할 수 있습니다

---

## ⚠️ 주의사항

### Key 필드에 들어가면 안 되는 것:
- ❌ `https://console.prisma.io/...` (URL)
- ❌ `prisma+postgres://...` (연결 문자열)
- ✅ `POSTGRES_PRISMA_URL` (변수 이름만)

### Value 필드에 들어가야 하는 것:
- ✅ `prisma+postgres://accelerate.prisma-data.net/?api_key=...` (연결 문자열 전체)

---

## 📋 정리

| 필드 | 입력 내용 | 예시 |
|------|----------|------|
| **Key** | 환경변수 이름 | `POSTGRES_PRISMA_URL` |
| **Value** | 데이터베이스 연결 문자열 | `prisma+postgres://accelerate.prisma-data.net/?api_key=...` |

**간단히 말하면:**
- Key = 변수 이름
- Value = 변수에 저장할 값 (데이터베이스 주소)
