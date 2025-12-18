/*
  Warnings:

  - Added the required column `categoryId` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Add the column as nullable first
ALTER TABLE "Candidate" ADD COLUMN "categoryId" TEXT;

-- Step 2: Backfill existing rows with the first available category (or create a default one if none exist)
DO $$
DECLARE
    default_category_id TEXT;
BEGIN
    -- Get the first category ID, or create a default category if none exists
    SELECT id INTO default_category_id FROM "categories" ORDER BY "order", "created_at" LIMIT 1;
    
    IF default_category_id IS NULL THEN
        -- Create a default category if none exists
        INSERT INTO "categories" (id, name, "order", "is_active", "created_at", "updated_at")
        VALUES (gen_random_uuid()::TEXT, 'Default Category', 0, true, NOW(), NOW())
        RETURNING id INTO default_category_id;
    END IF;
    
    -- Update all existing candidates with the default category
    UPDATE "Candidate" SET "categoryId" = default_category_id WHERE "categoryId" IS NULL;
END $$;

-- Step 3: Now make the column NOT NULL
ALTER TABLE "Candidate" ALTER COLUMN "categoryId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Voter" (
    "id" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "voterId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voter_serial_key" ON "Voter"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_candidateId_key" ON "Vote"("voterId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_categoryId_key" ON "Vote"("voterId", "categoryId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
