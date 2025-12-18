-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "isCancelled" BOOLEAN NOT NULL DEFAULT false;
