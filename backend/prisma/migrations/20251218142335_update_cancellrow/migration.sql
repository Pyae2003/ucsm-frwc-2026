/*
  Warnings:

  - A unique constraint covering the columns `[voterId,categoryId,isCancelled]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_voterId_categoryId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_categoryId_isCancelled_key" ON "Vote"("voterId", "categoryId", "isCancelled");
