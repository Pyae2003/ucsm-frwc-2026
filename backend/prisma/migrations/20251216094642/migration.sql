/*
  Warnings:

  - The primary key for the `Candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Candidate_id_seq";
