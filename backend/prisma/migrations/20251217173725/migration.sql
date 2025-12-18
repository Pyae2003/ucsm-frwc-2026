/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_categoryId_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vote_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
