/*
  Warnings:

  - You are about to drop the column `cancelledAt` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `isCancelled` on the `Vote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "cancelledAt",
DROP COLUMN "isCancelled";
