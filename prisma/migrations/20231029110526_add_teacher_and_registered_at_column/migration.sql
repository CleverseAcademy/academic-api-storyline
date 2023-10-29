/*
 Warnings:

 - A unique constraint covering the columns `[username]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `username` to the `Teacher` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Teacher"
  ADD COLUMN "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "username" TEXT NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

