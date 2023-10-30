/*
 Warnings:

 - Added the required column `username` to the `Teacher` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Teacher"
  ADD COLUMN "username" TEXT NOT NULL DEFAULT CONCAT('user-', gen_random_uuid());

;

