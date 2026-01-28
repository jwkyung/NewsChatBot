import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 환경변수 확인
const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('⚠️ 데이터베이스 URL이 설정되지 않았습니다.');
  console.error('POSTGRES_PRISMA_URL 또는 DATABASE_URL 환경변수를 확인하세요.');
}

// Prisma 클라이언트 생성
function createPrismaClient() {
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    
    // 연결 테스트
    client.$connect().catch((error) => {
      console.error('Prisma 연결 실패:', error);
    });
    
    return client;
  } catch (error: any) {
    console.error('Prisma 클라이언트 생성 실패:', error);
    throw error;
  }
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
