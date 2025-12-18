/*
  Warnings:

  - You are about to drop the column `cancelledAt` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `isCancelled` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[voterId,categoryId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_voterId_categoryId_isCancelled_key";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "cancelledAt",
DROP COLUMN "isCancelled";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_categoryId_key" ON "Vote"("voterId", "categoryId");
