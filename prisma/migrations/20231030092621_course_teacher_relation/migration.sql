/*
 Warnings:

 - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Course"
  ADD COLUMN "instructorId" UUID NOT NULL DEFAULT 'ad574698-0b90-42f6-a246-6cf5cbc75f02';

-- AddForeignKey
ALTER TABLE "Course"
  ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

