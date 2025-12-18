-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_categoryId_fkey";

-- DropIndex
DROP INDEX "Vote_voterId_candidateId_key";

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
